import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SegmentsComponent } from './segments/segments.component';
import { LoggerComponent } from './logger/logger.component';
import { FormUserComponent } from './form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { FunctionService } from '../services/functions';


@NgModule({
  declarations: [
    HeaderComponent,
    SegmentsComponent,
    LoggerComponent,
    FormUserComponent,
    LoadingComponent
  ],
  exports: [
    HeaderComponent,
    SegmentsComponent,
    LoggerComponent,
    FormUserComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  providers:
    [FunctionService]
})
export class ComponentsModule { }
