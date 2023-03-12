import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesAnaliticaPage } from './detalles-analitica.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesAnaliticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesAnaliticaPageRoutingModule {}
