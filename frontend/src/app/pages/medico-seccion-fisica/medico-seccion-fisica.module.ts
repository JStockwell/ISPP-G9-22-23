import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoSeccionFisicaPageRoutingModule } from './medico-seccion-fisica-routing.module';

import { MedicoSeccionFisicaPage } from './medico-seccion-fisica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoSeccionFisicaPageRoutingModule
  ],
  declarations: [MedicoSeccionFisicaPage]
})
export class MedicoSeccionFisicaPageModule {}
