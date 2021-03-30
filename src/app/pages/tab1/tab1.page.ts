import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { UserSign, UserSignData } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';



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
  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router) {

    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    this.user = JSON.parse(localStorage.getItem("user"));

  }

  ngOnInit() {
    console.log(this.user);
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    const fs = firebase.default.firestore();

    auth.onAuthStateChanged(user => {
      if (user) {
        this.loginCheck = true;

        this.userSignData = [];
        fs.collection('UsersSignIn').get()
          .then((snapshot) => {

            snapshot.docs.forEach(doc => {
              console.log(doc.data());
              this.userSignData.push(doc.data());
            })
          })
      } else {

        this.userSignData = null;
        this.loginCheck = false;
      }
    })

  }

  onClick() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("entro a inicio");
    if (user === null) {
      console.log("no existe user");
    } else {

      console.log("existe user", user);
      this.router.navigate( ['/add-publications'] );
    }
    console.log("ternimo a inicio");
  }
  verUser(event) {
    console.log(event)
    this.user = event.user;
    this.userSignData = event.userSignData;
    this.router.navigate( ['/add-publications'] );
    console.log(this.user, this.userSignData);

  }


}
