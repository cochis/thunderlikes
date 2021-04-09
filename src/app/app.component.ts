import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import firebase from "firebase/app";
import { Platform } from '@ionic/angular';
import { SplashScreenPlugin, StatusBarPlugin } from '@capacitor/core';
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
    private platform: Platform,
 
  ) {
    this.firebaseConfig = environment.firebaseConfig;
  }

  ngOnInit() {



  }

  initializeApp() {

    this.platform.ready().then(() => {
 
      // Initialize Firebase
      firebase.initializeApp(this.firebaseConfig);
      firebase.analytics();

      this.updates.available.subscribe((event) => {
        this.updateAvailable = true;

      });
    });




  }
  
}
