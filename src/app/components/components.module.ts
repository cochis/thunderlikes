import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SegmentsComponent } from './segments/segments.component';
import { LoggerComponent } from './logger/logger.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SegmentsComponent,
    LoggerComponent
  ],
  exports: [
    HeaderComponent,
    SegmentsComponent,
    LoggerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
