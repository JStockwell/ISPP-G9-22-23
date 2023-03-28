import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarFisicoPage } from './modificar-fisico.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarFisicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarFisicoPageRoutingModule {}
