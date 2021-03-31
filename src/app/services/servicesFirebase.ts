import { Injectable, Inject } from '@angular/core';
import { PostToLike } from '../interfaces/interfaces';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root',
})
export class ServicesFirebase {
    constructor() { }

    async getPostToLike() {
        const fs = firebase.default.firestore();
        const doc = fs.collection('postToLike');
        var divPost = document.getElementById("postFB");
        const observer = await doc.onSnapshot(docSnapshot => {
            var postToLike = [];
            docSnapshot.forEach(doc => {
                postToLike.push(doc.data());
            });
            return { response: 'ok', postToLike }
        }, err => {
            return { response: 'false', err }

        });


    }
}
