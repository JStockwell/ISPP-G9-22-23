import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAnalyticPage } from './new-analytic.page';

const routes: Routes = [
  {
    path: '',
    component: NewAnalyticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAnalyticPageRoutingModule {}
