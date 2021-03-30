import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  constructor(private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.presentLoading('Hola Mundo');
  }
  async presentLoading( message: string) {

    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();

  }

}
