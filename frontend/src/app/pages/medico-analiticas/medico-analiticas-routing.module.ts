import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoAnaliticasPage } from './medico-analiticas.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoAnaliticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoAnaliticasPageRoutingModule {}
