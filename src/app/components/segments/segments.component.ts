import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss'],
})
export class SegmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
