import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPacienteMedicoPageRoutingModule } from './nuevo-paciente-medico-routing.module';

import { NuevoPacienteMedicoPage } from './nuevo-paciente-medico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoPacienteMedicoPageRoutingModule
  ],
  declarations: [NuevoPacienteMedicoPage]
})
export class NuevoPacienteMedicoPageModule {}