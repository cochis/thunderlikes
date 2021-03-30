import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../../pages/modal/modal.page';
import { UserSign } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { environment } from '../../../environments/environment.prod';



@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
})
export class LoggerComponent implements OnInit {
  userSign: UserSign;
  typeLog: String;
  userSignData: any[] = [];
  firebaseConfig;
  loginCheck: Boolean = false;
  user: any = {};
  @Output() userEmit: EventEmitter<any>;
  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController) {
    this.userEmit = new EventEmitter();
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }


  }




  ngOnInit() {
    this.userSign = {
      nickname: "",
      email: "ing.oarrs@gmail.com",
      password: "123456",
      date: new Date().toDateString()
    }

    // const auth = admin.auth();
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    const fs = firebase.default.firestore();

    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user !== null) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));

      } else {
        this.user = undefined;
      }


      if (user) {
        this.loginCheck = true;
        this.userSignData = [];
        fs.collection('UsersSignIn').get()
          .then((snapshot) => {

            snapshot.docs.forEach(doc => {

              this.userSignData.push(doc.data());
              let emit = {
                user: this.user,
                userSignData: this.userSignData
              }
              this.userEmit.emit(emit);
            })


          })
      } else {

        this.userSignData = null;
        this.loginCheck = false;
      }
    })
  }
  async mostrarModal(type) {
    let userSign = this.userSign;

    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        userSign,
        type
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    // const  data  = await modal.onWillDismiss();
    console.log(data);


    if (data !== undefined) {
      if (data.error) {
        this.presentAlert("danger", data.error);
      } else {
        this.presentAlert("success", data);
      }
    }


  }

  logOut() {
    localStorage.removeItem("user");
    const auth = firebase.default.auth();
    auth.signOut().then(() => {
      let emit = {
        user: null ,
        userSignData: null
      }
      this.userEmit.emit(emit);
    });
  }
  async presentAlert(type, data: any) {
    if (type == "danger") {

      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        header: type,
        subHeader: 'Subtitle',
        message: data.message,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      console.log(data.profile);
      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        header: type,
        subHeader: 'Subtitle',
        message: data.profile.given_name,
        buttons: ['OK']
      });
      await alert.present();
    }



  }

}
