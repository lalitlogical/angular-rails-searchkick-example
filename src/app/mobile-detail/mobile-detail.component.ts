import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Mobile } from './../mobile-list/mobile.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from './../http-client.service';
import { UtilityService } from './../utility.service';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.css']
})
export class MobileDetailComponent implements OnInit {
  public mobile: Mobile;

  constructor(private utilityService: UtilityService,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.fetchMobileDetail(id);
  }

  fetchMobileDetail(id: number) {
    this.spinner.show();
    this.httpClientService.getRequest(`/mobiles/${id}`)
    .subscribe(res => {
      this.mobile = res.data;
      this.spinner.hide();
    });
  }

  goBack() {
    this.location.back();
  }
}
