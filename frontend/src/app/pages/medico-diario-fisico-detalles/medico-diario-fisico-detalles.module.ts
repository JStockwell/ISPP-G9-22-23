import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoDiarioFisicoDetallesPageRoutingModule } from './medico-diario-fisico-detalles-routing.module';

import { MedicoDiarioFisicoDetallesPage } from './medico-diario-fisico-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoDiarioFisicoDetallesPageRoutingModule
  ],
  declarations: [MedicoDiarioFisicoDetallesPage]
})
export class MedicoDiarioFisicoDetallesPageModule {}
