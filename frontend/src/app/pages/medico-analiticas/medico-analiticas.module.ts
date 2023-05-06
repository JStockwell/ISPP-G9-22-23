import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoAnaliticasPageRoutingModule } from './medico-analiticas-routing.module';

import { MedicoAnaliticasPage } from './medico-analiticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoAnaliticasPageRoutingModule
  ],
  declarations: [MedicoAnaliticasPage]
})
export class MedicoAnaliticasPageModule {}
