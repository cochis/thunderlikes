import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserSign, User, UserLogin } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() userSign: UserSign;
  @Input() user: User;
  @Input() type: string;
  auth: any;
  firebaseConfig;
  typeInput: string;
  userLogin:UserLogin;
  constructor(private modalCtrl: ModalController, private _auth: AuthService) {
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
    // firebase.default.initializeApp(this.firebaseConfig);
  }

  ngOnInit() {
    this.userLogin= {
      email:"prueba3@prueba1.com",
      password:"123456"

    }
    this.typeInput = this.type;
    console.log(this.type);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  login() {
    
    console.log(this.userLogin);
    this._auth.login(this.userLogin).then(
        (result) => {
         var data:any = {
            valid: true,
            result,
          }
          this.modalCtrl.dismiss({

            data
          })
        },
        (err) => {
          console.log(err);
          var data:any = {
            valid: false,
            err,
          }
          this.modalCtrl.dismiss({
            data
          })
        
        });
  }
  loginGoogle() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    this._auth.loginGoogle(provider).then(
      (result) => {
       var data:any = {
          valid: true,
          result,
        }
        this.modalCtrl.dismiss({

          data
        })
      },
      (err) => {
        console.log(err);
        var data:any = {
          valid: false,
          err,
        }
        this.modalCtrl.dismiss({
          data
        })
      
      });
  }
  loginFacebook() {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    this._auth.loginFacebook(provider).then(
      (result) => {
       var data:any = {
          valid: true,
          result,
        }
        this.modalCtrl.dismiss({

          data
        })
      },
      (err) => {
        console.log(err);
        var data:any = {
          valid: false,
          err,
        }
        this.modalCtrl.dismiss({
          data
        })
      
      });
  }
}
