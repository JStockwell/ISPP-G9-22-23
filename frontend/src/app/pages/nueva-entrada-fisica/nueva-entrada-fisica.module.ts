import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaEntradaFisicaPageRoutingModule } from './nueva-entrada-fisica-routing.module';

import { NuevaEntradaFisicaPage } from './nueva-entrada-fisica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaEntradaFisicaPageRoutingModule
  ],
  declarations: [NuevaEntradaFisicaPage]
})
export class NuevaEntradaFisicaPageModule {}
