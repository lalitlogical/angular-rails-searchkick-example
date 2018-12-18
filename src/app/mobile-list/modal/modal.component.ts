import { MobileService } from './../mobile.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public aggregation: {name: string, buckets: any[]};
  public selectedOptions: string[];

  constructor(private mobileService: MobileService) {
    this.mobileService.modelOpened.subscribe(
      (aggregation: any) => {
        this.aggregation = aggregation;
        this.setSelectedOptions();
      }
    );
  }

  ngOnInit() {
  }

  setSelectedOptions() {
    this.selectedOptions = this.mobileService.valueFor(this.aggregation.name, true);
  }

  applyFilters() {
    if (this.selectedOptions.length !== 0) {
      this.mobileService.navigateWith(this.aggregation.name, this.selectedOptions.join(','));
    }
  }

  clearAllFilter() {
    if (this.selectedOptions.length !== 0) {
      this.mobileService.navigateWith(this.aggregation.name, null);
    }
  }
}
