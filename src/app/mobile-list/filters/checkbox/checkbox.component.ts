import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MobileService } from '../../mobile.service';

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

  constructor(private mobileService: MobileService) { }

  ngOnInit() {
    this.checkboxId = this.categoryName + 'Checkbox' + this.bucket.key;
    if (this.modelCheckbox) {
      this.checkboxId += 'Model';
    }

    if (!this.selectedOptions) {
      this.selectedOptions = this.mobileService.valueFor(this.categoryName, true);
    }
  }

  onCheckboxChange(event: any, value: string) {
    const queryParams = this.mobileService.queryParams();

    if (event.target.checked) {
      this.selectedOptions.push(value);
    } else {
      this.selectedOptions.splice(this.selectedOptions.indexOf(value), 1);
    }

    queryParams[this.categoryName] = this.selectedOptions.join(',');
    if (!this.modelCheckbox) {
      this.mobileService.navigateWith(this.categoryName, this.selectedOptions.join(','));
    }
  }

}
