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
