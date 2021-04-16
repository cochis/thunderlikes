import { Injectable } from '@angular/core';
import { PostToLike } from '../interfaces/interfaces';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { retornaDocumentos } from '../helpers/mostrar-documentos';


// const db = firebase.default.database();
// const auth = firebase.default.auth();
var userConect = null;
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public database: AngularFirestore) { }

  async createDoc(data: any, path: string, id: string) {
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
     collection.ref.orderBy("dateCreatePostToLike", 'asc');
     return collection.valueChanges();
  }
  
  getCollectionPagination(path: string, lastDocument: number) {
    const collection = this.database.collection(path);
    const query = collection.ref
      .orderBy('dateCreatePostToLike', 'desc')
      .startAfter(lastDocument);
    query
      .limit(20)
      .get()
      .then((snap) => {
        retornaDocumentos(snap);
      });

    // const collection = this.database.collection(path);
    //  collection.valueChanges();
  }
}


