import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../../pages/modal/modal.page';
import { UserSign, User } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
})
export class LoggerComponent implements OnInit {
  userSign: UserSign;
  user: User;
  typeLog: String;
  userSignData: any[] = [];
  firebaseConfig;
  loginCheck: Boolean = false;

  @Output() userEmit: EventEmitter<any>;
  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private _auth: AuthService
  ) {
    this.userEmit = new EventEmitter();
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }


  }




  ngOnInit() {
    this.userSign = {
      nickname: "",
      email: "prueba1@prueba1.com",
      password: "123456",
      date: new Date().toDateString()
    }
    this.user = {
      uid: "",
      displayName: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      idRole: "",
      dateBirth: "",
      description: "",
      dateCreated: "",
      dateEdit: "",
      getPostLikes: ""
    }

    // const auth = admin.auth();
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    const fs = firebase.default.firestore();

    auth.onAuthStateChanged(user => {

      let url = this.router.url;

      console.log(user);


      this.user = {
        uid: user.uid,
        displayName: user.displayName,
        name: user.displayName,
        lastname: "",
        email: user.uid,
        password: "",
        idRole: user.uid,
        dateBirth: user.uid,
        description: user.uid,
        dateCreated: "",
        dateEdit: "",
        getPostLikes: ""
      }

      console.log(url);
      if (user !== null) {
        // this.user = user;
        //localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        localStorage.removeItem("user");
        this.user = undefined;
        this.emitNull();
        if (url !== "/register") {
          this.router.navigate(['/']);
        }

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


          });
        if (user.photoURL === null) {
          // user.photoURL = "assets/img/bussines/user.png";

        } else {
          setTimeout(() => {
            console.log(user.photoURL);
            console.log(document.getElementById("avatar"));
            document.getElementById("avatar").setAttribute("src", user.photoURL);
          }, 1000);

        }
      } else {

        this.userSignData = null;
        this.loginCheck = false;
      }
    })
  }
  async mostrarModal(type) {

    if (type == "2") {
      this.router.navigate(['/register']);
    } else {
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


  }

  logOut() {
    this._auth.logout().then(data => {
      localStorage.clear();
      this.emitNull();
      this.router.navigate(['/']);
    })

    /**
     const auth = firebase.default.auth();
     auth.signOut().then(() => {

       this.emitNull();

       localStorage.removeItem("user");
     });
     *
     */
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
      console.log(data);
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



  emitNull() {
    let emit = {
      user: null,
      userSignData: null,
      loadding: false
    }

    this.userEmit.emit(emit);
  }

}
