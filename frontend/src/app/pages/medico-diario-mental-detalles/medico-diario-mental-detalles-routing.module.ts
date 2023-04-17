import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoDiarioMentalDetallesPage } from './medico-diario-mental-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoDiarioMentalDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoDiarioMentalDetallesPageRoutingModule {}
