import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoDetallesAnaliticaPage } from './medico-detalles-analitica.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoDetallesAnaliticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoDetallesAnaliticaPageRoutingModule {}
