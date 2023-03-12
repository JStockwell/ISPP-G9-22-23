import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnaliticasPage } from './analiticas.page';

const routes: Routes = [
  {
    path: '',
    component: AnaliticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnaliticasPageRoutingModule {}
