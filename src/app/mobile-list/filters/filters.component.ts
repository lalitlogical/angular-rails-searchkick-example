import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() aggregation: {name: string, buckets: any[]};
  public selectedOptions: string[];

  constructor(private mobileService: MobileService ) { }

  ngOnInit() {
    if (!this.mobileService.filters[this.aggregation.name]) {
      this.mobileService.filters[this.aggregation.name] = [];
    }
    this.selectedOptions = this.mobileService.filters[this.aggregation.name];
  }

  clearSelectedOptions() {
    this.mobileService.filters[this.aggregation.name] = [];
    this.mobileService.filterSelected.emit();
  }

  openFilterModel() {
    this.mobileService.modelOpened.emit();
  }
}
