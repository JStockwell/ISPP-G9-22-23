import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaEntradaFisicaPage } from './nueva-entrada-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaEntradaFisicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaEntradaFisicaPageRoutingModule {}
