import { Mobile } from './../mobile-list/mobile.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MobileService } from '../mobile-list/mobile.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.css']
})
export class MobileDetailComponent implements OnInit {
  public mobile: Mobile;

  constructor(private mobileService: MobileService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.getMobileDetail(id);
  }

  getMobileDetail(id: number) {
    this.spinner.show();
    this.mobileService.getMobileDetail(id)
    .subscribe(res => {
      this.mobile = res.data;
      this.spinner.hide();
    });
  }
}
