import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, UserSign } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { FunctionService } from '../../services/functions';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserLocalStorageInterface } from 'src/app/interfaces/useLocalStorage.interface';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  ls = new SecureLS({ encodingType: 'aes' });
  public userSign: UserSign;
  public user: User = {
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
  userCredential: any;
  constructor(
    private functionService: FunctionService,
    private router: Router,
    private serviceFB: FirebaseService,
    private _auth: AuthService,
    private _firebaseService: FirebaseService
  ) {}

  ngOnInit() {}

  onSubmit(formulario: NgForm) {
    console.log('submit');
    var date = new Date();
    let dateCreated = date.getTime().toString();
    let dateEdit = date.getTime().toString();
    let id = this._firebaseService.getId();
    this.user.dateCreated = dateCreated;
    this.user.dateEdit = dateEdit;
    this.user.dateBirth = this.user.dateBirth;
    this.user.displayName = this.user.name + ' ' + this.user.lastname;
    this.user.idRole = 'UserCreate';
    this.user.uid = id;
    console.log(this.user);
    this._auth.createUser(this.user).then(
      (user) => {
        console.log('User', user);
        localStorage.setItem('dUaStEaR', JSON.stringify(user));
        id = this._firebaseService.getId();
        this._firebaseService.createDoc(this.user, '/Users', id);

        this.userSign = {
          uid: user.user.uid,
          displayname: user.user.displayName,
          email: user.user.email,
          date: new Date().toDateString(),
          emailVerified: user.user.emailVerified,
        };

        id = this._firebaseService.getId();
        this._firebaseService.createDoc(this.userSign, '/UserSign', id);
        this.router.navigate(['/tabs/tab2']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  registerGoogle() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    this._auth.loginGoogle(provider).then(
      (user) => {
        localStorage.setItem('dUaStEaR', JSON.stringify(user));

        this.userSign = {
          uid: user.user.uid,
          displayname: user.user.displayName,
          email: user.user.email,
          date: new Date().toDateString(),
          emailVerified: user.user.emailVerified,
        };

        let id = this._firebaseService.getId();
        this._firebaseService.createDoc(this.userSign, '/UserSign', id);
        this.router.navigate(['/tabs/tab2']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  registerFacebook() {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    this._auth.loginFacebook(provider).then(
      (user) => {
        localStorage.setItem('dUaStEaR', JSON.stringify(user));
        this.userSign = {
          uid: user.user.uid,
          displayname: user.user.displayName,
          email: user.user.email,
          date: new Date().toDateString(),
          emailVerified: user.user.emailVerified,
        };

        let id = this._firebaseService.getId();
        this._firebaseService.createDoc(this.userSign, '/UserSign', id);
        this.router.navigate(['/tabs/tab2']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
