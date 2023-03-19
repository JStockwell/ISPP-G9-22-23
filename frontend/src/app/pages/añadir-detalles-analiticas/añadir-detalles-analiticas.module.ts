import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AñadirDetallesAnaliticasPage } from './añadir-detalles-analiticas.page';


import { AñadirDetallesAnaliticasPageRoutingModule } from './añadir-detalles-analiticas-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AñadirDetallesAnaliticasPageRoutingModule
  ],
  declarations: [AñadirDetallesAnaliticasPage]
})
export class AñadirDetallesAnaliticasPageModule {}
