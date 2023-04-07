import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarCitaPageRoutingModule } from './modificar-cita-routing.module';

import { ModificarCitaPage } from './modificar-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarCitaPageRoutingModule
  ],
  declarations: [ModificarCitaPage]
})
export class ModificarCitaPageModule {}
