import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClientService {
  public base_url = 'http://localhost:3008/api/v1';

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {}

  public getRequest(endpoint: string, query?: string, httpOptions?: any): Observable<any> {
    return this.http.get(`${this.base_url}${endpoint}?${query}`, httpOptions);
  }

  public postRequest(endpoint: string, data?: any, httpOptions?: any): Observable<any> {
    return this.http.post(`${this.base_url}${endpoint}`, data, httpOptions);
  }

  public valueFor(categoryName: string, multiple = true) {
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    if (!queryParams[categoryName]) {
      return multiple ? [] : '';
    } else if (multiple) {
      return queryParams[categoryName].split(',');
    }
    return queryParams[categoryName];
  }

  public queryParams() {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public navigateWith(categoryName: string, value: string, root?: boolean) {
    if (root) {
      const queryParams = {};
      if (categoryName) {
        queryParams[categoryName] = value;
      }
      this.router.navigate(['mobiles'], { queryParams: queryParams });
    } else {
      let queryParams = this.queryParams();
      if (categoryName !== 'page') {
        delete queryParams['page'];
      }
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
