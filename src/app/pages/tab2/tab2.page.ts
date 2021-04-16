import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PostToLike } from '../../interfaces/interfaces';
import { FunctionService } from '../../services/functions';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PrevisualizacionPostModalComponent } from '../../components/previsualizacion-post-modal/previsualizacion-post-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  user: any = JSON.parse(localStorage.getItem('dUaStEaR'));
  PeAtReAsM: any;
  plattform = [];
  requires = [];
  postToLike: PostToLike = {
    idUser: '',
    nameUser: '',
    idPlattform: 'fb',
    requires: ['lk'],
    dateCreatePostToLike: '',
    dateEditPostToLike: '',
    datePostEnd: '',
    urlPostToLike: 'https://www.facebook.com/UberForBusiness/posts/794626994467971',
  };

  constructor(
    private funtionSv: FunctionService,
    private serviceFb: FirebaseService,
    private router: Router,
    private _functionsService: FunctionService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.serviceFb.getCollection('/PtAhRnAdMeEsTlEiRkSe').subscribe((res) => {
      this.PeAtReAsM = res;
      for (let elemento of this.PeAtReAsM) {
        if (elemento.type == 'plattform') {
          this.plattform.push(elemento);
        }
        if (elemento.type == 'requires') {
          this.requires.push(elemento);
        }
      }
    });
    this.postToLike.idUser = this.user.user.displayName;
    this.postToLike.nameUser = this.user.user.displayName;
  }
  onSubmit(formulario: NgForm) {
    var date = new Date();
    this.postToLike.dateCreatePostToLike = date.getTime().toString();
    this.postToLike.dateEditPostToLike = date.getTime().toString();
    this.postToLike.datePostEnd = date.getTime().toString();
    this.postToLike.idUser = this.user.user.uid;
    let id = this.serviceFb.getId();

    this.serviceFb.createDoc(this.postToLike, '/PostToLike', id);
    this.router.navigate(['/']);
    this._functionsService.remove();
    setTimeout(() => {
      this._functionsService.addFacebook
    }, 2000);
    // this.serviceFb.getCollection('/PostToLike').subscribe((res) => {
    //   console.log(res);
    // });
  }

  async mostrarModal() {
    var date = new Date();
    this.postToLike.dateCreatePostToLike = date.getTime().toString();
    this.postToLike.dateEditPostToLike = date.getTime().toString();
    this.postToLike.datePostEnd = date.getTime().toString();
    this.postToLike.idUser = this.user.user.uid;

    const modal = await this.modalCtrl.create({
      component: PrevisualizacionPostModalComponent,
      componentProps: {
        postToLike: this.postToLike,
        user: this.user
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
}
