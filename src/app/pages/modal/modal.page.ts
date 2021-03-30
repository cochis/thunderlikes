import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserSign } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() userSign: UserSign;
  @Input() type: String;
  auth: any;
  firebaseConfig;
  constructor(private modalCtrl: ModalController) {
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    // firebase.default.initializeApp(this.firebaseConfig);

  }

  ngOnInit() {

  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  enviar() {
   
    let email = this.userSign.email;
    let password = this.userSign.password;

    const auth = firebase.default.auth();
    auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      
      
      this.modalCtrl.dismiss({
        userCredential
      });
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.modalCtrl.dismiss({
        error
      });
    });;

  }
  login() {
   
    let emailSignIn = this.userSign.email;
    let password = this.userSign.password;
    let dateSignIn = this.userSign.date;


    const auth = firebase.default.auth();
    const db = firebase.default.database();
    auth.signInWithEmailAndPassword(emailSignIn, password).then(userCredential => {
      const newSign = {
        emailSignIn: emailSignIn,
        dateSingIn: dateSignIn,
        dateSingOut: ""
      }
      db.ref('UsersSignIn').push(newSign);

      this.modalCtrl.dismiss({
        userCredential
      });
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.modalCtrl.dismiss({
        error
      });
    });;
  }
  loginGoogle() {
    const auth = firebase.default.auth();
    const provider = new firebase.default.auth.GoogleAuthProvider();
    const db = firebase.default.database();
    auth.signInWithPopup(provider).then(result => {
      console.log(result.additionalUserInfo.profile);
      var profile = result.additionalUserInfo.profile;
      this.modalCtrl.dismiss({
        profile
      });
 
      let user = result.user;
      let date = new Date().toString();
      const newSign = {
        emailSignIn: user.email,
        dateSingIn: date,
        dateSingOut: ""
      }
     
      db.ref('UsersSignIn').push(newSign).then(newUser => {
      
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }
  loginFacebook() {
    const auth = firebase.default.auth();
    const provider = new firebase.default.auth.FacebookAuthProvider();
    const db = firebase.default.database();
    auth.signInWithPopup(provider).then(result => {
      this.modalCtrl.dismiss();
      console.log(result);
      let user = result.user;
      let date = new Date().toString();
      const newSign = {
        emailSignIn: user.email,
        dateSingIn: date,
        dateSingOut: ""
      }
      
      db.ref('UsersSignIn').push(newSign).then(newUser => {
        
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }

}
