import { Component, OnInit, Input } from '@angular/core';
import { PostToLike } from '../../interfaces/interfaces';
import { FunctionService } from '../../services/functions';
import { ModalController } from '@ionic/angular';
import { FacebookService } from '../../services/facebook.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previsualizacion-post-modal',
  templateUrl: './previsualizacion-post-modal.component.html',
  styleUrls: ['./previsualizacion-post-modal.component.scss'],
})
export class PrevisualizacionPostModalComponent implements OnInit {
  @Input() postToLike: PostToLike;
  @Input() user: any;
  url: string = '';
  postTolike: PostToLike;
  // user:any;
  constructor(
    private _functions: FunctionService,
    private modalCtrl: ModalController,
    private serviceFb: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.postTolike = this.values.postToLike;
    // this.user = this.values.user;

    this._functions.remove();
    document
      .getElementById('postShow')
      .setAttribute('data-href', this.postToLike.urlPostToLike);
    document
      .getElementById('comentsShow')
      .setAttribute('data-href', this.postToLike.urlPostToLike);
    setTimeout(() => {
      this._functions.addFacebook();
    }, 500);
  }

  enviar() {
    var date = new Date();
    console.log(this.postToLike);
    let id = this.serviceFb.getId();
    this.serviceFb.createDoc(this.postToLike, '/PostToLike', id);
    console.log('antes');

    this.router.navigate(['/tabs/home']);
    console.log('despues');
    this.modalCtrl.dismiss({
      nombre: 'Felipe',
      pais: 'España'
    }); 
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
