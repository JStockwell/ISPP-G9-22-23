import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioFisicoPage } from './calendario-fisico.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioFisicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioFisicoPageRoutingModule {}
