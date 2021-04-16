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
    if (document.getElementById('headFacebook')) {
      var element = document.getElementById('headFacebook');
      console.log(element);
      if (element) {
        console.log('elimino');

        element.parentNode.removeChild(element);
      } else {
        console.log('undefined');
      }

      setTimeout(() => {
        console.log('integra scripts');
        if (!document.getElementById('headFacebook')) {
          this.addFacebook();
        }
      }, 1000);
    } else {
      setTimeout(() => {
        console.log('integra scripts');
        if (!document.getElementById('headFacebook')) {
          this.addFacebook();
        }
      }, 1000);
    }

    // const scriptList = document.querySelectorAll('script');
    // console.log('*_* scripts', scriptList);
    // const convertedNodeList = Array.from(scriptList);
    // const testScript = convertedNodeList.find(
    //   (script) => script.id === 'headFacebook'
    // );
    // console.log('*_* scripts 2', testScript);
    // testScript?.parentNode.removeChild(testScript);
    // console.log('*_* scripts 3', testScript);
    // setTimeout(() => {
    //   console.log('integra scripts');
    //   if (!document.getElementById('headFacebook')) {
    //     this.addFacebook();
    //   }
    // }, 5000);
  }

  addFacebook() {
    var script = document.createElement('script');
    script.src =
      'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0&appId=252220469914921&autoLogAppEvents=1';
    script.async = true;
    script.defer = true;
    script.id = 'headFacebook';
    script.nonce = 'n4VHesYa';
    console.log('*_* addFacebook', script);
    document.head.appendChild(script);
  }
}
