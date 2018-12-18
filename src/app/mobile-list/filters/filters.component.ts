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
    this.selectedOptions = this.mobileService.valueFor(this.aggregation.name, true);
  }

  clearSelectedOptions() {
    this.mobileService.navigateWith(this.aggregation.name, null);
  }

  openFilterModel() {
    this.mobileService.modelOpened.emit(this.aggregation);
  }
}
