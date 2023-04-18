import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoSeccionMentalPageRoutingModule } from './medico-seccion-mental-routing.module';

import { MedicoSeccionMentalPage } from './medico-seccion-mental.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoSeccionMentalPageRoutingModule
  ],
  declarations: [MedicoSeccionMentalPage]
})
export class MedicoSeccionMentalPageModule {}
