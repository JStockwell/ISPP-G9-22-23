import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarAnaliticaPage } from './modificar-analitica.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarAnaliticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarAnaliticaPageRoutingModule {}
