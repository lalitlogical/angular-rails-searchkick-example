import { MobileService } from './mobile.service';
import { Mobile } from './mobile.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
  public activeFilter = '_score';
  @ViewChild('searchInput') searchInputRef: ElementRef;

  constructor(private mobileService: MobileService, private spinner: NgxSpinnerService, private router: Router) {
    this.mobileService.filterSelected.subscribe(
      () => this.getMobiles()
    );
  }

  ngOnInit() {
    this.getMobiles();
  }

  onTabClick(sorting: string) {
    this.activeFilter = sorting;
    this.mobileService.filters['sorting'] = sorting;
    this.getMobiles();
  }

  onSearchTextFieldBlur() {
    this.getMobiles();
  }

  onClickOfSuggestion(suggestion: string) {
    this.mobileService.filters = [];
    this.searchInputRef.nativeElement.value = suggestion;
    this.getMobiles();
  }

  getMobiles() {
    this.spinner.show();
    const query = [];
    const queryParams = {};
    const searchText = this.searchInputRef.nativeElement.value;
    if (searchText) {
      queryParams['search'] = searchText;
      query.push('search=' + searchText);
    }
    for (const filter in this.mobileService.filters) {
      let value = null;
      if (filter === 'sorting') {
        if (this.mobileService.filters[filter]) {
          value = this.mobileService.filters[filter];
        }
      } else if (this.mobileService.filters[filter].length !== 0) {
        value = this.mobileService.filters[filter].join(',');
      }

      if (value) {
        queryParams[filter] = value;
        query.push(filter + '=' + value);
      }
    }
    this.router.navigate(['mobiles'], { queryParams: queryParams });
    // call APIs for mobile list
    this.mobileService.getMobiles(query.join('&'))
    .subscribe(res => {
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
    for (const filter in this.mobileService.filters) {
      if (this.mobileService.filters[filter].length !== 0) {
        filters.push(filter);
      }
    }
    return filters;
  }

  removeFilter(filter: string) {
    if (filter === 'sorting') {
      this.activeFilter = '_score';
      this.mobileService.filters[filter] = '_score';
    } else {
      this.mobileService.filters[filter] = [];
    }
    this.getMobiles();
  }

  removeAllFilter() {
    this.searchInputRef.nativeElement.value = '';
    this.mobileService.filters = [];
    this.getMobiles();
  }

}
