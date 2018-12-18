import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from '../../utility.service';
import { HttpClientService } from './../../http-client.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() aggregation: {name: string, buckets: any[]};
  public selectedOptions: string[];

  constructor(private utilityService: UtilityService,
    private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.selectedOptions = this.httpClientService.valueFor(this.aggregation.name, true);
  }

  clearSelectedOptions() {
    this.httpClientService.navigateWith(this.aggregation.name, null);
  }

  openFilterModel() {
    this.utilityService.modelOpened.emit(this.aggregation);
  }
}
