import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public updateAvailable: boolean = false;
  constructor(
    private updates: SwUpdate,
  ) { }

  ngOnInit() {


  }

  initializeApp() {
    this.updates.available.subscribe((event) => {
      this.updateAvailable = true;
    });

  }
}
