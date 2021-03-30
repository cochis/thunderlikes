import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-publications',
  templateUrl: './add-publications.page.html',
  styleUrls: ['./add-publications.page.scss'],
})
export class AddPublicationsPage implements OnInit {
  user: any = JSON.parse(localStorage.getItem("user"));
  usuario = { 
    email: '',
    password: ''
  }

  constructor() {
    console.log(this.user);
  }

  ngOnInit() {
    console.log(this.user);
  }
  onSubmit( formulario: NgForm ) {
    console.log('submit');
    console.log(this.usuario);
    console.log(formulario);
  }

}
