import { MobileService } from './mobile.service';
import { Mobile } from './mobile.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css'],
  providers: [MobileService]
})
export class MobileListComponent implements OnInit {
  public mobiles: Mobile[] = [];
  public meta: any;
  public suggestions: any[] = [];
  public aggregations: any[] = [];
  public sorting_tabs: any[] = [
    { name: 'Popularity', sort_by: '_score' },
    { name: 'Price -- Low to High', sort_by: 'price_asc' },
    { name: 'Price -- High to Low', sort_by: 'price_desc' },
    { name: 'Newest First', sort_by: 'newest' }
  ];
  public searchText = '';
  public apiCompleted = false;

  constructor(private mobileService: MobileService, 
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.fetchMobiles();
    });
  }

  ngOnInit() {
    this.spinner.show();
  }

  isTabActive(sorting: string) {
    const activeSorting = this.mobileService.valueFor('sorting');
    if ((activeSorting && activeSorting === sorting) || (!activeSorting && sorting === '_score')) {
      return true;
    }
    return false;
  }

  onTabClick(sorting: string) {
    this.mobileService.navigateWith('sorting', sorting);
  }

  onSearchTextFieldBlur(event: any) {
    this.mobileService.navigateWith('search', event.target.value);
  }

  onClickOfSuggestion(suggestion: string) {
    this.mobileService.navigateWith('search', suggestion, true);
  }

  fetchMobiles() {
    this.spinner.show();

    // build API query based on browser queries
    const query = ['per_page=10'];
    const queryParams = this.mobileService.queryParams();
    for (const queryParam in queryParams) {
      query.push(queryParam + '=' + queryParams[queryParam]);
    }

    // search text if any
    this.searchText = this.mobileService.valueFor('search');

    // call API for mobile listing data
    this.mobileService.fetchMobiles(query.join('&'))
    .subscribe(res => {
      this.apiCompleted = true;
      this.meta = res.meta;
      this.aggregations = [];
      for (const key in res.meta.aggregations) {
        const buckets = res.meta.aggregations[key]['buckets'];
        if (buckets.length !== 0) {
          this.aggregations.push({
            name: key,
            buckets: buckets.sort((a: any, b: any) => a.count > b.count ? 1 : -1)
          });
        }
      }
      this.aggregations.sort((a, b) => a.name > b.name ? 1 : -1);
      this.suggestions = res.meta.suggestions;
      this.mobiles = res.data.map(mobile => new Mobile().deserialize(mobile));
      this.spinner.hide();
    });
  }

  getFilters() {
    const filters = [];
    for (const filter in this.mobileService.queryParams()) {
      if (filter !== 'search' && filter !== 'sorting') {
        filters.push(filter);
      }
    }
    return filters;
  }

  removeFilter(filter: string) {
    this.mobileService.navigateWith(filter, null);
  }

  removeAllFilters() {
    this.mobileService.navigateWith(null, null);
  }

}
