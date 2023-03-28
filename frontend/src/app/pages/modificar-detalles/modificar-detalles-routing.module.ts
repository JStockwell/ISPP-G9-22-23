import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarDetallesPage } from './modificar-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarDetallesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarDetallesPageRoutingModule {}