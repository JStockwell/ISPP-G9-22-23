import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeccionFisicaPage } from './seccion-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: SeccionFisicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionFisicaPageRoutingModule {}
