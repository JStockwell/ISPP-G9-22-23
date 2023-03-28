import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesMentalPage } from './detalles-mental.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesMentalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesMentalPageRoutingModule {}
