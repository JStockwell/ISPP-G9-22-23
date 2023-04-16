import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicHomePage } from './medic-home.page';

const routes: Routes = [
  {
    path: '',
    component: MedicHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicHomePageRoutingModule {}
