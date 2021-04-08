import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';
  @Output() userEmit: EventEmitter <any>;
  constructor() { 
    this.userEmit = new EventEmitter();
  }

  ngOnInit() { }


   verUser( $event ){
     console.log($event);
     this.sendUser($event)
   }

   sendUser(user) {
    this.userEmit.emit(user);
   }

}
