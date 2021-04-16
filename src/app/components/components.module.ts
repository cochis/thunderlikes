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
import { ServicesFirebase } from '../services/servicesFirebase';
import { PrevisualizacionPostModalComponent } from './previsualizacion-post-modal/previsualizacion-post-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SegmentsComponent,
    LoggerComponent,
    FormUserComponent,
    LoadingComponent,
    PrevisualizacionPostModalComponent
  ],
  exports: [
    HeaderComponent,
    SegmentsComponent,
    LoggerComponent,
    FormUserComponent,
    LoadingComponent,
    PrevisualizacionPostModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  providers:
    [FunctionService,
    ServicesFirebase
    ]
})
export class ComponentsModule { }
