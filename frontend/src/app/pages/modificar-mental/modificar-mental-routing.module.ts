import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarMentalPage } from './modificar-mental.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarMentalPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificarMentalPageRoutingModule {}
