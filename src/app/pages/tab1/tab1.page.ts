import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { UserSign, UserSignData, PostToLike } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ServicesFirebase } from 'src/app/services/servicesFirebase';


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
  flagPost : Boolean= false;
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
    private servicesFB: ServicesFirebase) {

    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    this.user = JSON.parse(localStorage.getItem("user"));

  }

  ngOnInit() {
    // console.log(this.user);
    this.loadding = true;
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    const fs = firebase.default.firestore();
    // this.loadding = true;
    auth.onAuthStateChanged(user => {
      if (user) {
        this.loginCheck = true;

        // this.userSignData = [];
        // fs.collection('UsersSignIn').get()
        //   .then((snapshot) => {

        //     snapshot.docs.forEach(doc => {
        //       console.log(doc.data());
        //       this.userSignData.push(doc.data());
        //       this.loadding = false;
        //     })
        //   })


        // const doc = fs.collection('UsersSignIn');

        // const observer = doc.onSnapshot(docSnapshot => {
        //   this.postsToLike = [];
        //   docSnapshot.forEach(doc => {
        //     console.log(doc.data());
        //     this.userSignData.push(doc.data());
        //   });

        //   // this.userSignData = docSnapshot.data();
        //   // ...
        // }, err => {
        //   console.log(`Encountered error: ${err}`);
        // });
        // var divPost = document.getElementById("postFB");



        const doc = fs.collection('postToLike');

        const observer = doc.onSnapshot(docSnapshot => {
          this.postsToLikes = [];
          this.postToLike = [];

          docSnapshot.forEach(doc => {
            console.log(doc.data());
            this.postToLike.push(doc.data());
          });
          this.flagPost = true;
          console.log(this.postToLike, this.postToLike.length);
         
        }, err => {
          console.log(`Encountered error: ${err}`);
        });


        console.log(this.test, this.test.length);
        




       this.postToLike = this.servicesFB.getPostToLike();
      } else {

        this.userSignData = null;
        this.loginCheck = false;
        this.loadding = false;
      }
    });
    this.loadding = false;

  }

  onClick() {
    this.loadding = true;
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("entro a inicio");
    if (user === null) {
      // console.log("no existe user");
      this.loadding = false;
      this.router.navigate(['/register']);
    } else {

      // console.log("existe user", user);
      // this.router.navigate(['/add-publications']);
      this.loadding = false;
    }
    // console.log("ternimo a inicio");
  }
  verUser(event) {

    // console.log(event)
    this.user = event.user;
    this.loadding = event.loadding;
    this.userSignData = event.userSignData;
    // this.router.navigate(['/add-publications']);
    // console.log(this.user, this.userSignData, this.loadding);

  }



}
