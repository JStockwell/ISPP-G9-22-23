import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoDiarioMentalDetallesPageRoutingModule } from './medico-diario-mental-detalles-routing.module';

import { MedicoDiarioMentalDetallesPage } from './medico-diario-mental-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoDiarioMentalDetallesPageRoutingModule
  ],
  declarations: [MedicoDiarioMentalDetallesPage]
})
export class MedicoDiarioMentalDetallesPageModule {}
