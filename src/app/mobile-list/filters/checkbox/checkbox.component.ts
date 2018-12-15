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
  @Input() selectedOptions: string[];

  constructor(private mobileService: MobileService) { }

  ngOnInit() {}

  onCheckboxChange(event: any, value: string) {
    let oldSelectedOptions: any;
    if (this.modelCheckbox) {
      oldSelectedOptions = this.selectedOptions;
    } else {
      oldSelectedOptions = this.mobileService.filters[this.categoryName];
    }

    if (event.target.checked) {
      oldSelectedOptions.push(value);
    } else {
      oldSelectedOptions.splice(oldSelectedOptions.indexOf(value), 1);
    }

    if (this.modelCheckbox) {
      this.selectedOptions = oldSelectedOptions;
    } else {
      this.mobileService.filterSelected.emit();
    }
  }

}
