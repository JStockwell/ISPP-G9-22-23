import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoSeccionFisicaPage } from './medico-seccion-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoSeccionFisicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoSeccionFisicaPageRoutingModule {}
