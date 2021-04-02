import { Injectable } from '@angular/core';
import { PostToLike } from '../interfaces/interfaces';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


// const db = firebase.default.database();
// const auth = firebase.default.auth();
var userConect = null;
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public database: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);

  }

  getDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);

  }

  getId() {
    return this.database.createId();

  }
  getCollection(path: string) {
    const collection = this.database.collection(path);
    return collection.valueChanges();
  }

  createUser(user) {
    console.log(user);
    const auth = firebase.default.auth();
    const db = firebase.default.database();
    auth.signInWithEmailAndPassword(user.email, user.password).then(userCredential => {

      console.log(userCredential);

    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

    });;
  }

}
