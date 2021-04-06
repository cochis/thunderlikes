import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../../pages/modal/modal.page';
import { UserSign, User } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
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
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private _auth: AuthService,
    private _firebaseService: FirebaseService
  ) {
    this.userEmit = new EventEmitter();
    this.firebaseConfig = environment.firebaseConfig;
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(this.firebaseConfig);
    }
  }
  ngOnInit() {
    this.user = {
      uid: '',
      displayName: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      idRole: '',
      dateBirth: '',
      description: '',
      dateCreated: '',
      dateEdit: '',
      getPostLikes: '',
    };
    if (localStorage.getItem('dUaStEaR')) {
      this.loginCheck = true;
      var userStorage = JSON.parse(localStorage.getItem('dUaStEaR'));
      this.insertPhoto(userStorage);
      let emit = {
        user: userStorage,
        loadding: true,
      };
      this.userEmit.emit(emit);
    }
  }
  async mostrarModal(type) {
    if (type == '2') {
      this.router.navigate(['/register']);
    } else {
      let userSign = this.userSign;
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          userSign,
          type,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      var valid = data.data.valid;
      var result = data.data.result;
      this.loginCheck = valid;
      this.insertPhoto(result);
      if (valid == false) {
        this.presentAlert('danger', 'eror');
      } else {
        localStorage.setItem('dUaStEaR', JSON.stringify(result));
        this.userSign = {
          uid: result.user.uid,
          displayname: result.user.displayName,
          email: result.user.email,
          date: new Date().toDateString(),
          emailVerified: result.user.emailVerified,
        };

        let id = this._firebaseService.getId();
        this._firebaseService.createDoc(this.userSign, '/UserSign', id).then(
          (result) => {
            this.presentAlert('success', 'Entro');
            let emit = {
              user: result,
              loadding: true,
            };
            this.userEmit.emit(emit);
          },
          (err) => {
            console.log(err);
            this.presentAlert('danger', 'Hubo un error ');
          }
        );
      }
    }
  }
  logOut() {
    this._auth.logout().then((data) => {
      this.loginCheck = false;
      localStorage.clear();
      this.emitNull();
      this.router.navigate(['/']);
    });
  }

  async presentAlert(type, data: any) {
    if (type == 'danger') {
      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        header: type,
        subHeader: 'Subtitle',
        message: data,
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        header: type,
        subHeader: 'Subtitle',
        message: data,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  emitNull() {
    let emit = {
      user: null,
      loadding: false,
    };

    this.userEmit.emit(emit);
  }

  insertPhoto(user) {
    if (user.user.photoURL !== null) {
      setTimeout(() => {
        document
          .getElementById('avatar')
          .setAttribute('src', user.user.photoURL);
      }, 500);
    }
  }
}
