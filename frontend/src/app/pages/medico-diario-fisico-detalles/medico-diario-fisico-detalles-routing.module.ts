import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoDiarioFisicoDetallesPage } from './medico-diario-fisico-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoDiarioFisicoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoDiarioFisicoDetallesPageRoutingModule {}
