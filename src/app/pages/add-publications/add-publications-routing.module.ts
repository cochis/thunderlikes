import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPublicationsPage } from './add-publications.page';

const routes: Routes = [
  {
    path: '',
    component: AddPublicationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPublicationsPageRoutingModule {}
