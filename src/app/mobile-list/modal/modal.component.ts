import { Component, OnInit, Input } from '@angular/core';
import { HttpClientService } from './../../http-client.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public aggregation: {name: string, buckets: any[]};
  public selectedOptions: string[];

  constructor(private utilityService: UtilityService,
    private httpClientService: HttpClientService) {
    this.utilityService.modelOpened.subscribe(
      (aggregation: any) => {
        this.aggregation = aggregation;
        this.setSelectedOptions();
      }
    );
  }

  ngOnInit() {
  }

  setSelectedOptions() {
    this.selectedOptions = this.httpClientService.valueFor(this.aggregation.name);
  }

  applyFilters() {
    if (this.selectedOptions.length !== 0) {
      this.httpClientService.navigateWith(this.aggregation.name, this.selectedOptions.join(','));
    }
  }

  clearAllFilter() {
    if (this.selectedOptions.length !== 0) {
      this.httpClientService.navigateWith(this.aggregation.name, null);
    }
  }
}
