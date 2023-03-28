import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesFisicoPage } from './detalles-fisico.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesFisicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesFisicoPageRoutingModule {}
