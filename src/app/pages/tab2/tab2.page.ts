import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PostToLike } from '../../interfaces/interfaces';
import { FunctionService } from '../../services/functions';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user: any = JSON.parse(localStorage.getItem("user"));

  postToLike: PostToLike = {
    idUser: '',
    idPlattform: '',
    requires: [null],
    dateCreatePostToLike: '',
    dateEditPostToLike: '',
    datePostEnd: '',
    urlPostToLike: ''
  };



  constructor(private funtionSv: FunctionService, private serviceFb: FirebaseService) {

  }

  ngOnInit() {
    
    console.log(this.user);
    
    
  }
  onSubmit(formulario: NgForm) {
    var date = new Date;
    this.postToLike.dateCreatePostToLike = date.getTime().toString();
    this.postToLike.dateEditPostToLike = date.getTime().toString();
    this.postToLike.datePostEnd =  date.getTime().toString();
    let id  = this.serviceFb.getId();
 
    
    this.serviceFb.createDoc(this.postToLike, "/PostToLike", id);

    this.serviceFb.getCollection("/PostToLike").subscribe(res => {
      console.log(res);

    });

  }

}
