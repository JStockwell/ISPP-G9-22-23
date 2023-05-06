import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarPerfilPage } from './modificar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPerfilPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPerfilPageRoutingModule {}