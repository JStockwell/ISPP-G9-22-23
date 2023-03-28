import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaCitaPage } from './nueva-cita.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaCitaPageRoutingModule {}
