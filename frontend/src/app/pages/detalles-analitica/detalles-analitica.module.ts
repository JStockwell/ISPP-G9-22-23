import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesAnaliticaPageRoutingModule } from './detalles-analitica-routing.module';

import { DetallesAnaliticaPage } from './detalles-analitica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesAnaliticaPageRoutingModule
  ],
  declarations: [DetallesAnaliticaPage]
})
export class DetallesAnaliticaPageModule {}
