import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeoService } from './seo.service';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
@Injectable({
  providedIn: 'root',
})
export class FunctionService {
  ls = new SecureLS({ encodingType: 'aes' });
  constructor(
    private http: HttpClient,
    private seo: SeoService,
    private router: Router
  ) {}

  convertBeautifulDate(uglyDate) {
    var date = new Date(uglyDate),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    var hrs = date.getHours();
    var mins = date.getMinutes();
    var hrs1 = '';
    var mins1 = '';
    if (hrs <= 9) hrs1 = '0' + hrs;
    else hrs1 = '' + hrs;
    if (mins < 10) mins1 = '0' + mins;
    else mins1 = '' + mins;
    const postTime = hrs1 + ':' + mins1;
    let timeDate = [day, mnth, date.getFullYear()].join('/') + ' - ' + postTime;
    return timeDate;
  }
  remove() {
    const scriptList = document.querySelectorAll('script');
    // console.log('*_* scripts', scriptList);
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find(
      (script) => script.id === 'headFacebook'
    );
    testScript?.parentNode.removeChild(testScript);
  }
}
