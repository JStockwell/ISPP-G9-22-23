import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoSeccionMentalPage } from './medico-seccion-mental.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoSeccionMentalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoSeccionMentalPageRoutingModule {}
