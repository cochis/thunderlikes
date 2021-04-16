import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { UserSign } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import * as SecureLS from 'secure-ls';
import { IonInfiniteScroll } from '@ionic/angular';
import { FunctionService } from '../../services/functions';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data: any[] = Array(20);
  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;
  userSign: UserSign;
  typeLog: String;
  userSignData: any[] = [];
  firebaseConfig;
  loginCheck: Boolean = false;
  postToLike: any = [];
  checkNoMore: boolean = false;
  sum: number = 12;
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
  p: number = 1;
  collection: any[] = [];
  constructor(
    private router: Router,
    private serviceFb: FirebaseService,
    private functionService: FunctionService
  ) {
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    this.user = JSON.parse(localStorage.getItem('dUaStEaR'));
  }

  ngOnInit() {
    this.loadding = true;
    if (this.user !== null && this.user !== undefined) {
      var range;
      // this.serviceFb.getCollectionPagination('/PostToLike', 0) ;

      this.serviceFb.getCollection('/PostToLike').subscribe((res) => {
        res = this.sort(res);
        this.postToLike = res;
        var count = 0;
        this.charguePost(this.sum);
      });
    } else {
      console.log('no existe');
    }
    this.loadding = false;
  }
  onPageChange(event) {
    
    console.log("cambio de  pagina "+event);

    
    this.charguePost(this.sum - 1);
  }

  charguePost(range) {
    var count = 0;
    var flag = false;

    setTimeout(() => {
      if (this.postToLike.length < range) {
        range = this.postToLike.length;
      }
      this.postToLike = this.sort(this.postToLike);
      for (let i = 0; i < range; i++) {
        flag = this.postToLike[i].requires.includes('sh');
        if (flag && document.getElementById('btnShare' + count)) {
          document
            .getElementById('btnShare' + count)
            .setAttribute('data-href', this.postToLike[i].urlPostToLike);
        }
        flag = this.postToLike[i].requires.includes('lk');
        if (flag && document.getElementById('post' + count)) {
          document
            .getElementById('post' + count)
            .setAttribute('data-href', this.postToLike[i].urlPostToLike);
        }
        flag = this.postToLike[i].requires.includes('cm');
        if (flag && document.getElementById('comment' + count)) {
          document
            .getElementById('comment' + count)
            .setAttribute('data-href', this.postToLike[i].urlPostToLike);
        }
        ++count;
      }
      this.functionService.remove();
    }, 2000);
  }

  scriptFB() {
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
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find(
      (script) => script.id === 'headFacebook'
    );
    testScript?.parentNode.removeChild(testScript);
    setTimeout(() => {
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
    this.user = event.user;
    this.loadding = false;
    this.userSignData = event.userSignData;
  }

  cargarPost(range) {
    this.postToLike = undefined;
    this.postToLike = [];
    var postToLike = JSON.parse(localStorage.getItem('pLoIsKtEtO'));
    for (let i = range.init; i < range.end; i++) {
      this.postToLike.push(postToLike[i]);
    }
    var count = 0;
    setTimeout(() => {
      for (let i = 0; i < range.end; i++) {
        if (
          postToLike[i].requires.includes('sh') &&
          document.getElementById('btnShare' + count)
        ) {
          document
            .getElementById('btnShare' + count)
            .setAttribute('data-href', postToLike[i].urlPostToLike);
        }
        if (
          postToLike[i].requires.includes('lk') &&
          document.getElementById('post' + count)
        ) {
          document
            .getElementById('post' + count)
            .setAttribute('data-href', postToLike[i].urlPostToLike);
        }
        if (
          postToLike[i].requires.includes('cm') &&
          document.getElementById('comment' + count)
        ) {
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

  sort(elements) {
    var result;
    result = elements.sort((a, b) =>
      a.dateCreatePostToLike < b.dateCreatePostToLike ? 1 : -1
    );
    return result;
  }

  getUser(user) {
    if (localStorage.getItem('dUaStEaR')) {
      this.user = JSON.parse(localStorage.getItem('dUaStEaR'));
      var range = {
        init: 0,
        end: this.sum,
        checkNoMore: true,
      };
      localStorage.setItem('vMeArA', JSON.stringify(range));
      this.serviceFb.getCollectionPagination('/PostToLike', 0);
    } else {
      this.user = user.user;
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
    // var dUaStEaR;
    // var pLoIsKtEtO;
    // if (localStorage.getItem('dUaStEaR')) {
    //   dUaStEaR = JSON.parse(localStorage.getItem('dUaStEaR'));
    // }
    // if (localStorage.getItem('dUaStEaR')) {
    //   pLoIsKtEtO = JSON.parse(localStorage.getItem('pLoIsKtEtO'));
    // }
    // localStorage.clear();
    // if (pLoIsKtEtO !== null) {
    //   localStorage.setItem('pLoIsKtEtO', JSON.stringify(pLoIsKtEtO));
    // }
    // if (dUaStEaR !== null) {
    //   localStorage.setItem('dUaStEaR', JSON.stringify(dUaStEaR));
    // }
    // if (localStorage.getItem('vMeArA')) {
    //   localStorage.removeItem('vMeArA');
    // }
    // var range = {
    //   init: 0,
    //   end: this.sum,
    //   checkNoMore: true,
    // };
    // localStorage.setItem('vMeArA', JSON.stringify(range));

    // this.serviceFb.getCollection('/PostToLike').subscribe((res) => {
    //   res = this.sort(res);
    //   localStorage.setItem('pLoIsKtEtO', JSON.stringify(res));
    //   setTimeout(() => {
    //     this.cargarPost(range);
    //   }, 500);
    // });

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      if (this.postToLike.length > 1000) {
        this.inifiteScroll.complete();
        this.inifiteScroll.disabled = true;
        return;
      }
      const nuevoArr = Array(20);
      this.postToLike.push(...nuevoArr);
      this.inifiteScroll.complete();
    }, 1500);
  }
 

}
