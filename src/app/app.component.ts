import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import firebase from "firebase/app";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public updateAvailable: boolean = false;
  firebaseConfig;
  constructor(
    private updates: SwUpdate,
  ) { 
    this.firebaseConfig = environment.firebaseConfig;
  }

  ngOnInit() {
  
   

  }

  initializeApp() {
     // Initialize Firebase
     firebase.initializeApp(this.firebaseConfig);
     firebase.analytics();
    
    this.updates.available.subscribe((event) => {
      this.updateAvailable = true;
      
    });

  }
}
