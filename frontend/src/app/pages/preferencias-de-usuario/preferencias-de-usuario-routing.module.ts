import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferenciasDeUsuarioPage } from './preferencias-de-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PreferenciasDeUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferenciasDeUsuarioPageRoutingModule {}
