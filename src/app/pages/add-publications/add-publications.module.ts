import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPublicationsPageRoutingModule } from './add-publications-routing.module';

import { AddPublicationsPage } from './add-publications.page';
import { ComponentsModule } from '../../components/components.module';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPublicationsPageRoutingModule,
    ComponentsModule,
    ExploreContainerComponentModule
  ],
  declarations: [AddPublicationsPage]
})
export class AddPublicationsPageModule {}
