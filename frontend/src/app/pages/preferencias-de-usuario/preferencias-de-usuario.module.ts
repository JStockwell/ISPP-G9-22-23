import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferenciasDeUsuarioPageRoutingModule } from './preferencias-de-usuario-routing.module';

import { PreferenciasDeUsuarioPage } from './preferencias-de-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferenciasDeUsuarioPageRoutingModule
  ],
  declarations: [PreferenciasDeUsuarioPage]
})
export class PreferenciasDeUsuarioPageModule {}
