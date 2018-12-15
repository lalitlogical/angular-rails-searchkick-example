import { Mobile } from './../mobile.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-item',
  templateUrl: './mobile-item.component.html',
  styleUrls: ['./mobile-item.component.css']
})
export class MobileItemComponent implements OnInit {
  @Input() mobile: Mobile;

  constructor() { }

  ngOnInit() {
  }

}
