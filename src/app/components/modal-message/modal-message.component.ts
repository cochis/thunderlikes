import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss'],
})
export class ModalMessageComponent implements OnInit {
  @Input() type: string;
  @Input() message: string;
  @Input() varss: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      type: this.type,
      message: this.message,
      varss: this.varss

    });
  }

}
