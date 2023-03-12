import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeccionFisicaPageRoutingModule } from './seccion-fisica-routing.module';

import { SeccionFisicaPage } from './seccion-fisica.page';
import { EntraFisicaGeneralComponentModule } from '../../entrada-fisica-general/entrada-fisica-general-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeccionFisicaPageRoutingModule,
    EntraFisicaGeneralComponentModule,
  ],
  declarations: [SeccionFisicaPage],
})
export class SeccionFisicaPageModule {}
