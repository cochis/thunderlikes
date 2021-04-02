import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../interfaces/interfaces';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { FunctionService } from '../../services/functions';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

 
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})



export class FormUserComponent implements OnInit {
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
  constructor(private functionService: FunctionService, private router: Router, private serviceFB: FirebaseService) { }

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
    this.serviceFB.createUser(this.user);
        
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
