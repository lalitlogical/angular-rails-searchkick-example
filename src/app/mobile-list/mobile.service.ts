import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Mobile } from './mobile.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MobileService {
  public base_url = 'http://localhost:3009/api/v1';
  public mobiles: Mobile[];
  modelOpened = new EventEmitter<void>();

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {}

  public fetchMobiles(query: string): Observable<any> {
    return this.http.get(this.base_url + '/mobiles?' + query);
  }

  public fetchMobileDetail(id: number): Observable<any> {
    return this.http.get(this.base_url + '/mobiles/' + id);
  }

  humanize(text: any) {
    if (text && typeof text === 'string') {
      text = text.split('_');

      // go through each word in the text and capitalize the first letter
      for (const i in text) {
          let word = text[i];
          word = word.toLowerCase();
          word = word.charAt(0).toUpperCase() + word.slice(1);
          text[i] = word;
      }

      return text.join(' ');
    }
    return text;
  }

  valueFor(categoryName: string, multiple?: boolean) {
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    if (!queryParams[categoryName]) {
      return multiple ? [] : '';
    } else if (multiple) {
      return queryParams[categoryName].split(',');
    }
    return queryParams[categoryName];
  }

  queryParams() {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  navigateWith(categoryName: string, value: string, root?: boolean) {
    if (root) {
      const queryParams = {};
      if (categoryName) {
        queryParams[categoryName] = value;
      }
      this.router.navigate(['mobiles'], { queryParams: queryParams });
    } else {
      let queryParams = this.queryParams();
      if (categoryName) {
        if (value) {
          queryParams[categoryName] = value;
        } else {
          delete queryParams[categoryName];
        }
      } else {
        queryParams = {};
      }
      this.router.navigate(['mobiles'], { queryParams: queryParams });
    }
  }
}
