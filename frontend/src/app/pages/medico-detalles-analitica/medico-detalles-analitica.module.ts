import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoDetallesAnaliticaPageRoutingModule } from './medico-detalles-analitica-routing.module';

import { MedicoDetallesAnaliticaPage } from './medico-detalles-analitica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoDetallesAnaliticaPageRoutingModule
  ],
  declarations: [MedicoDetallesAnaliticaPage]
})
export class MedicoAnaliticasDetallesPageModule {}
