import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SegmentsComponent } from './segments/segments.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SegmentsComponent
  ],
  exports: [
    HeaderComponent,
    SegmentsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
