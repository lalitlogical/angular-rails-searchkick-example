import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Mobile } from './mobile-list/mobile.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilityService {
  modelOpened = new EventEmitter<any>();

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {}

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
