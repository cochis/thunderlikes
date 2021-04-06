import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = firebase.default.auth();

  constructor() {}

  async login(userModel): Promise<any> {
    return await this.auth.signInWithEmailAndPassword(
      userModel.email,
      userModel.password
    );
  }

  async createUser(user) {
    return await this.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  async logout(): Promise<any> {
    return await this.auth.signOut();
  }

  async loginGoogle(provider) {
    return await this.auth.signInWithPopup(provider);
  }
  async loginFacebook(provider) {
    return await this.auth.signInWithPopup(provider);
  }
}
