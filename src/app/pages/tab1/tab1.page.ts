import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { UserSign, UserSignData } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { environment } from '../../../environments/environment.prod';



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
  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController) {

    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }


  }

  ngOnInit() {
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
              
              this.userSignData.push(doc.data());
            })
          })
      } else {
        
        this.userSignData = null;
        this.loginCheck = false;
      }
    })

  }




}
