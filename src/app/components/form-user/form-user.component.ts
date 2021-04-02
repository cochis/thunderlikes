import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../interfaces/interfaces';
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
  ls = new SecureLS({encodingType: 'aes'});
  public user: User = {
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
  userCredential: any;
  constructor(
    private functionService: FunctionService,
    private router: Router, private serviceFB: FirebaseService,
    private _auth: AuthService
    ) { }

  ngOnInit() { }

  onSubmit(formulario: NgForm) {
    console.log('submit');
    let dateCreated = this.functionService.convertBeautifulDate(new Date);
    let dateEdit = this.functionService.convertBeautifulDate(new Date);
    this.user.dateCreated = dateCreated;
    this.user.dateEdit = dateEdit;
    this.user.dateBirth = this.functionService.convertBeautifulDate(this.user.dateBirth);
    this.user.displayName = this.user.name + " " + this.user.lastname;
    console.log(this.user);
    //this.serviceFB.createUser(this.user);
    this._auth.createUser(this.user).then(response => {
      console.log('*_* response: ', response);
      var userLS: UserLocalStorageInterface = {
        email: response.user.email,
        uid: response.user.uid,
        displayName: (response.user.displayName==undefined||response.user.displayName==null?'':response.user.displayName),
        photoUrl: response.user.photoURL
      }
      this.ls.set('dUaStEaR', userLS);
      //localStorage.setItem('dUaStEaR', JSON.stringify(userLS));
    }).catch(error => {
      console.log('*_* error: ', error);

    });
  }

  registerGoogle() {
    const auth = firebase.default.auth();
    const provider = new firebase.default.auth.GoogleAuthProvider();
    const db = firebase.default.database();
    auth.signInWithPopup(provider).then(result => {
      console.log(result.additionalUserInfo.profile);
      var profile = result.additionalUserInfo.profile;


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
  registerFacebook() {
    const auth = firebase.default.auth();
    const provider = new firebase.default.auth.FacebookAuthProvider();
    const db = firebase.default.database();
    auth.signInWithPopup(provider).then(result => {

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

  cancelar() {
    this.router.navigate(['/']);
  }
}
