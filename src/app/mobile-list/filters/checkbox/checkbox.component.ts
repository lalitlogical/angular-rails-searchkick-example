import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from './../../../http-client.service';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() modelCheckbox: boolean;
  @Input() categoryName: string;
  @Input() bucket: {key: string, count: number};
  @Input() selectedOptions: string[] = null;
  public checkboxId: string;

  constructor(private utilityService: UtilityService,
    private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.checkboxId = `${this.categoryName}Checkbox${this.bucket.key}`;
    if (this.modelCheckbox) {
      this.checkboxId += 'Model';
    }

    if (!this.selectedOptions) {
      this.selectedOptions = this.httpClientService.valueFor(this.categoryName);
    }
  }

  onCheckboxChange(event: any, value: string) {
    const queryParams = this.httpClientService.queryParams();

    if (event.target.checked) {
      this.selectedOptions.push(value);
    } else {
      this.selectedOptions.splice(this.selectedOptions.indexOf(value), 1);
    }

    queryParams[this.categoryName] = this.selectedOptions.join(',');
    if (!this.modelCheckbox) {
      this.httpClientService.navigateWith(this.categoryName, this.selectedOptions.join(','));
    }
  }

}
