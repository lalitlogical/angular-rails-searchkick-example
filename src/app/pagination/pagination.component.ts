import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClientService } from './../http-client.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: {
    total_count: number,
    current_page: number,
    next_page: number,
    per_page: number
  };
  public pages = [];

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildPages();
  }

  selectPage(page: number) {
    this.httpClientService.navigateWith('page', page + '');
  }

  noPrevious() {
    return this.pagination.current_page === 1;
  }

  noNext() {
    return this.pagination.current_page === this.pagination.total_count;
  }

  lastPage() {
    return (this.pagination.total_count / this.pagination.per_page);
  }

  buildPages() {
    this.pages = [];
    const max_pages = 5;
    const padding = Math.floor(max_pages / 2);

    let left_page = 1;
    let last_page = this.lastPage() > max_pages ? max_pages : this.lastPage();

    if (this.pagination.current_page > padding) {
      left_page = this.pagination.current_page - padding;
      last_page = this.pagination.current_page + padding;
      if (last_page > this.lastPage()) { last_page = this.lastPage(); }
    }

    for (let index = left_page; index <= last_page; index++) {
      this.pages.push(index);
    }
  }

}
