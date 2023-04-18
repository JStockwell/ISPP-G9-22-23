import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoPacienteMedicoPage } from './nuevo-paciente-medico.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoPacienteMedicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoPacienteMedicoPageRoutingModule {}