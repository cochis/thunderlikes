import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { UserSign, UserSignData } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ServicesFirebase } from 'src/app/services/servicesFirebase';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userSign: UserSign;
  typeLog: String;
  userSignData: any[] = [];
  firebaseConfig;
  loginCheck: Boolean = false;
  postToLike: any;
  postsToLikes: any;
  postsToLike: any[] = [];
  test = [1, 1];
  lengthPost: number = 0;
  flagPost: Boolean = false;
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/img/logo/thunderlikes-1.png',
      titulo: 'Quienes somos',
      desc: 'Nuestra función es ayudarte a encontrar personas las cuales tienen que como tú el objetivo de subir likes o comentarios en tus redes sociales y asi mismo todos puedan subir, asi que podras compartir tu POST y decir  que quieres  si un like , un cometario o que lo compartan'
    },
    {
      img: '/assets/img/bussines/like.png',
      titulo: 'Dando Like',
      desc: 'Intercambia Likes'
    },
    {
      img: '/assets/img/bussines/comment.png',
      titulo: 'Commentando',
      desc: 'lorem'
    },
    {
      img: '/assets/img/bussines/share.png',
      titulo: 'Compartiendo',
      desc: 'Siempre sabremos donde estás!'
    }
  ];
  user: any;
  loadding: Boolean = false;
  inner = "";



  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private serviceFb: FirebaseService) {

    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    this.user = JSON.parse(localStorage.getItem("user"));

  }

  ngOnInit() {

    console.log('*_* init', this.user);
    this.loadding = true;
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    const fs = firebase.default.firestore();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.loginCheck = true;
        const doc = fs.collection('postToLike');
        this.serviceFb.getCollection("/PostToLike").subscribe(res => {

          this.postToLike = res;
          console.log(this.postToLike);
          this.flagPost = true;
          console.log('*_* posttolike: ', this.postToLike);
          setTimeout(() => {
            for (let i = 0; i < this.postToLike.length; i++) {

              console.log('*_* for: ', this.postToLike[i].urlPostToLike);
              console.log(document.getElementById("algo" + i));

              document.getElementById("algo" + i).setAttribute("data-href", this.postToLike[i].urlPostToLike);
              document.getElementById("algo1" + i).setAttribute("data-href", this.postToLike[i].urlPostToLike);
            }
          this.revome();

          }, 1000);
        },
          error => {
            console.log(error);

          })
      } else {
        this.userSignData = null;
        this.loginCheck = false;
        this.loadding = false;
      }
    });
    this.loadding = false;
  }
  scriptFB() {
    console.log('scripot fb');

    var script = document.createElement("script");
    script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0&appId=252220469914921&autoLogAppEvents=1";
    script.async = true;
    script.defer = true;
    script.id = "headFacebook"
    document.head.appendChild(script);
  }

  revome() {
    const scriptList = document.querySelectorAll("script")
    console.log('*_* scripts', scriptList);

    const convertedNodeList = Array.from(scriptList)
    const testScript = convertedNodeList.find(script => script.id === "headFacebook")
    console.log('*_* scripts 2', testScript);
    testScript?.parentNode.removeChild(testScript)

    setTimeout(() => {
      this.scriptFB();
    }, 1000);

  }

  onClick() {
    this.loadding = true;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      this.loadding = false;
      this.router.navigate(['/register']);
    } else {
      this.loadding = false;
    }
  }
  verUser(event) {
    this.user = event.user;
    this.loadding = event.loadding;
    this.userSignData = event.userSignData;
    // this.router.navigate(['/add-publications']);
    // console.log(this.user, this.userSignData, this.loadding);

  }



}
