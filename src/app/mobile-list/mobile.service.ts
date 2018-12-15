import { Injectable, EventEmitter } from '@angular/core';
import { Mobile } from './mobile.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MobileService {
  public mobiles: Mobile[];
  public filters: {} = {};
  public modalFilters: {} = {};
  filterSelected = new EventEmitter<void>();
  modelOpened = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  public getMobiles(query: string): Observable<any> {
    return this.http.get('http://localhost:3009/api/v1/mobiles?' + query);
  }

  public getMobileDetail(id: number): Observable<any> {
    return this.http.get('https://yts.am/api/v2/movie_details.json?movie_id' + id);
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
}
