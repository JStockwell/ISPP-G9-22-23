import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {tycPage } from './tyc.page';

const routes: Routes = [
  {
    path: '',
    component: tycPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class tycPageRoutingModule {}