import { MobileService } from './../../mobile.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() aggregation: {name: string, buckets: any[]};
  public selectedOptions: string[];

  constructor(private mobileService: MobileService) {
    this.mobileService.modelOpened.subscribe(
      () => {
        this.setSelectedOptions();
      }
    );
  }

  ngOnInit() {
    this.setSelectedOptions();
  }

  setSelectedOptions() {
    this.selectedOptions = this.mobileService.filters[this.aggregation.name].slice(0);
  }

  applyFilters() {
    if (this.selectedOptions.length !== 0) {
      this.mobileService.filters[this.aggregation.name] = this.selectedOptions;
      this.mobileService.filterSelected.emit();
    }
  }

  clearAllFilter() {
    if (this.selectedOptions.length !== 0) {
      this.mobileService.filters[this.aggregation.name] = [];
      this.mobileService.filterSelected.emit();
    }
  }
}
