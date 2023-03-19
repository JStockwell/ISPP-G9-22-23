import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AñadirDetallesAnaliticasPage } from './añadir-detalles-analiticas.page';

const routes: Routes = [
  {
    path: '',
    component: AñadirDetallesAnaliticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AñadirDetallesAnaliticasPageRoutingModule {}
