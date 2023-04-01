import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCitaPage } from './modificar-cita.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCitaPageRoutingModule {}
