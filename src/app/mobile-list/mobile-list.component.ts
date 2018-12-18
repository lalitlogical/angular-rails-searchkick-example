import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UtilityService } from './../utility.service';
import { HttpClientService } from './../http-client.service';
import { Mobile } from './mobile.model';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css'],
  providers: []
})
export class MobileListComponent implements OnInit {
  public mobiles: Mobile[] = [];
  public pagination: any;
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

  constructor(private utilityService: UtilityService,
    private httpClientService: HttpClientService,
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

  mobileListInfo() {
    let text = 'Mobiles (Showing ';
    const firstElementNumber = ((this.pagination.current_page - 1) * this.pagination.per_page) + 1;
    text += firstElementNumber;
    text += ' – ';
    text += (firstElementNumber + this.mobiles.length - 1);
    text += ' products of ' + this.pagination.total_count + ' products)';
    return text;
  }

  isTabActive(sorting: string) {
    const activeSorting = this.httpClientService.valueFor('sorting');
    if ((activeSorting && activeSorting === sorting) || (!activeSorting && sorting === '_score')) {
      return true;
    }
    return false;
  }

  onTabClick(sorting: string) {
    this.httpClientService.navigateWith('sorting', sorting);
  }

  onSearchTextFieldBlur(event: any) {
    this.httpClientService.navigateWith('search', event.target.value);
  }

  onClickOfSuggestion(suggestion: string) {
    this.httpClientService.navigateWith('search', suggestion, true);
  }

  isPreviousPageAvailable() {
    return this.pagination && this.pagination.current_page >= 2;
  }

  isNextPageAvailable() {
    return this.pagination && this.pagination.next_page !== null;
  }

  loadPageFor(page: number) {
    this.httpClientService.navigateWith('page', page + '');
  }

  fetchMobiles() {
    this.spinner.show();

    // build API query based on browser queries
    const query = ['per_page=10'];
    const queryParams = this.httpClientService.queryParams();
    for (const queryParam in queryParams) {
      query.push(`${queryParam}=${queryParams[queryParam]}`);
    }

    // search text if any
    this.searchText = this.httpClientService.valueFor('search');

    // call API for mobile listing data
    this.httpClientService.getRequest('/mobiles', query.join('&'))
    .subscribe(res => {
      this.apiCompleted = true;
      this.pagination = res.meta.pagination;
      this.suggestions = res.meta.suggestions;
      this.aggregations = res.meta.aggregations;
      this.aggregations.sort((a, b) => a.name > b.name ? 1 : -1);
      this.mobiles = res.data.map(mobile => new Mobile().deserialize(mobile));
      this.spinner.hide();
    });
  }

  getFilters() {
    const filters = Object.keys(this.httpClientService.queryParams());
    for (const filter in ['search', 'sorting']) {
      if (filters.indexOf(filter) >= 0) {
        filters.splice(filters.indexOf(filter), 1);
      }
    }
    return filters;
  }

  removeFilter(filter: string) {
    this.httpClientService.navigateWith(filter, null);
  }

  removeAllFilters() {
    this.httpClientService.navigateWith(null, null);
  }

}
