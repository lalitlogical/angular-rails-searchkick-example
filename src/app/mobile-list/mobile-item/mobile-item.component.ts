import { Mobile } from './../mobile.model';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mobile-item',
  templateUrl: './mobile-item.component.html',
  styleUrls: ['./mobile-item.component.css']
})
export class MobileItemComponent implements OnInit {
  @Input() mobile: Mobile;
  @ViewChild('avatarImage') avatarImageRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  placeholder() {
    this.avatarImageRef.nativeElement.src = '/src/assets/img/placeholder4.png';
  }

}
