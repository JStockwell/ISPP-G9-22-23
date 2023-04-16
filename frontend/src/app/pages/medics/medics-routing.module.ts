import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicsPage } from './medics.page';

const routes: Routes = [
  {
    path: '',
    component: MedicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicsPageRoutingModule {}
