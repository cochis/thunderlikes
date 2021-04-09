import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import {
  UserSign,
  UserSignData,
  PostToLike,
} from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ServicesFirebase } from 'src/app/services/servicesFirebase';
import { FirebaseService } from '../../services/firebase.service';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  userSign: UserSign;
  typeLog: String;
  userSignData: any[] = [];
  firebaseConfig;
  loginCheck: Boolean = false;
  postToLike: any = [];
  checkNoMore: boolean = false;
  sum: number = 4;
  test = [1, 1];
  lengthPost: number = 0;
  flagPost: Boolean = false;
  LS = new SecureLS({ encodingType: 'AES' });
  slides: { img: string; titulo: string; desc: string }[] = [
    {
      img: '/assets/img/logo/thunderlikes-1.png',
      titulo: 'Quienes somos',
      desc:
        'Nuestra función es ayudarte a encontrar personas las cuales tienen que como tú el objetivo de subir likes o comentarios en tus redes sociales y asi mismo todos puedan subir, asi que podras compartir tu POST y decir  que quieres  si un like , un cometario o que lo compartan',
    },
    {
      img: '/assets/img/bussines/like.png',
      titulo: 'Dando Like',
      desc: 'Intercambia Likes',
    },
    {
      img: '/assets/img/bussines/comment.png',
      titulo: 'Commentando',
      desc: 'lorem',
    },
    {
      img: '/assets/img/bussines/share.png',
      titulo: 'Compartiendo',
      desc: 'Siempre sabremos donde estás!',
    },
  ];
  user: any;
  loadding: Boolean = false;
  inner = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private serviceFb: FirebaseService
  ) {
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    this.user = JSON.parse(localStorage.getItem('dUaStEaR'));
  }

  ngOnInit() {
    // console.log('*_* init', this.user);
    this.loadding = true;
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    const fs = firebase.default.firestore();
    // console.log(this.user);
    if (this.user !== null && this.user !== undefined) {
      var range;
      // console.log("existe");
      this.serviceFb.getCollection('/PostToLike').subscribe((res) => {
        console.log(res);
        res = this.sort(res);
        localStorage.setItem('pLoIsKtEtO', JSON.stringify(res));
        if (!localStorage.getItem('vMeArA')) {
          range = {
            init: 0,
            end: this.sum,
            checkNoMore: true,
          };
        } else {
          range = JSON.parse(localStorage.getItem('vMeArA'));
        }
        this.checkNoMore = range.checkNoMore;
        localStorage.setItem('vMeArA', JSON.stringify(range));
        // this.postToLike = res;

        this.flagPost = true;
        this.cargarPost(range);
      });
    } else {
      console.log('no existe');
    }
    this.loadding = false;
  }
  scriptFB() {
    // console.log('scripot fb');

    var script = document.createElement('script');
    script.src =
      'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0&appId=252220469914921&autoLogAppEvents=1';
    script.async = true;
    script.defer = true;
    script.id = 'headFacebook';
    script.nonce = 'n4VHesYa';

    document.head.appendChild(script);
  }

  remove() {
    const scriptList = document.querySelectorAll('script');
    // console.log('*_* scripts', scriptList);
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find(
      (script) => script.id === 'headFacebook'
    );
    // console.log('*_* scripts 2', testScript);
    testScript?.parentNode.removeChild(testScript);

    setTimeout(() => {
      // console.log("integra scripts");
      if (!document.getElementById('headFacebook')) {
        this.scriptFB();
      }
    }, 2000);
  }

  onClick() {
    this.loadding = true;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      this.loadding = false;
      this.router.navigate(['/register']);
    } else {
      this.loadding = false;
    }
  }
  verUser(event) {
    // console.log(event);
    this.user = event.user;
    this.loadding = false;
    this.userSignData = event.userSignData;
    // this.router.navigate(['/add-publications']);
    // console.log(this.user, this.userSignData, this.loadding);
  }

  cargarPost(range) {
    console.log(range);
    this.postToLike = undefined;
    this.postToLike = [];
    var postToLike = JSON.parse(localStorage.getItem('pLoIsKtEtO'));
    for (let i = range.init; i < range.end; i++) {
      this.postToLike.push(postToLike[i]);
    }
    console.log(this.postToLike);
    var count = 0;
    console.log(range);
    setTimeout(() => {
      for (let i = 0; i < range.end; i++) {
        // console.log(postToLike[i]);
        // document.getElementById("postShow" + count).setAttribute("data-href", postToLike[i].urlPostToLike);
        console.log(postToLike[i].requires);

        if (
          postToLike[i].requires.includes('sh') &&
          document.getElementById('btnShare' + count)
        ) {
          console.log('share' + count, postToLike[i].requires.includes('sh'));
          document
            .getElementById('btnShare' + count)
            .setAttribute('data-href', postToLike[i].urlPostToLike);
        }
        if (
          postToLike[i].requires.includes('lk') &&
          document.getElementById('post' + count)
        ) {
          console.log('like' + count, postToLike[i].requires.includes('lk'));
          document
            .getElementById('post' + count)
            .setAttribute('data-href', postToLike[i].urlPostToLike);
        }
        if (
          postToLike[i].requires.includes('cm') &&
          document.getElementById('comment' + count)
        ) {
          console.log('coment' + count, postToLike[i].requires.includes('cm'));
          document
            .getElementById('comment' + count)
            .setAttribute('data-href', postToLike[i].urlPostToLike);
        }

        ++count;
      }

      this.eliminarHeadFacebook();
      this.remove();
    }, 1000);
  }

  verMas() {
    var range = JSON.parse(localStorage.getItem('vMeArA'));
    var post = JSON.parse(localStorage.getItem('pLoIsKtEtO'));

    var checkNoMore = false;
    // console.log(range);
    var init = range.init + this.sum;

    if (range.end + this.sum > post.length) {
      var end = post.length;
      checkNoMore = false;
    } else {
      var end = range.end + this.sum;
      checkNoMore = true;
    }

    range = {
      init: init,
      end: end,
      checkNoMore,
    };

    localStorage.setItem('vMeArA', JSON.stringify(range));
    // window.location.reload();
    this.cargarPost(range);
  }
  lessPage() {
    this.postToLike = [];
    var range = JSON.parse(localStorage.getItem('vMeArA'));
    var post = JSON.parse(localStorage.getItem('pLoIsKtEtO'));

    var checkNoMore = false;
    // console.log(range);
    var init = range.init - this.sum;
    var end = range.end - this.sum;

    range = {
      init: init,
      end: end,
      checkNoMore,
    };

    this.cargarPost(range);
  }
  ngOnChanges() {
    var range = JSON.parse(localStorage.getItem('vMeArA'));
    this.cargarPost(range);
  }
  sort(elements) {
    console.log(elements);
    var result;
    result = elements.sort((a, b) =>
      a.dateCreatePostToLike < b.dateCreatePostToLike ? 1 : -1
    );
    return result;
  }

  getUser(user) {
    console.log(user);

    if (localStorage.getItem('dUaStEaR')) {
      this.user = JSON.parse(localStorage.getItem('dUaStEaR'));
    } else {
      this.user = user;
    }
  }
  eliminarHeadFacebook() {
    var imagen = document.getElementById('headFacebook');
    if (imagen) {
      var padre = imagen.parentNode;
      padre.removeChild(imagen);
    }
  }

  doRefresh(event) {
    if (localStorage.getItem('vMeArA')) {
      localStorage.removeItem('vMeArA');
    }
    var range = {
      init: 0,
      end: this.sum,
      checkNoMore: true,
    };
    localStorage.setItem('vMeArA', JSON.stringify(range));
    this.cargarPost(range);
    setTimeout(() => {
     event.target.complete();
    }, 2000);
  }
}
