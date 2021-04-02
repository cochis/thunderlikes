import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = firebase.default.auth();

  constructor() {}

  async createUser(user){
    return await this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }


}
