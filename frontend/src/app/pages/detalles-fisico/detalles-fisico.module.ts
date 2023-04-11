import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesFisicoPageRoutingModule } from './detalles-fisico-routing.module';

import { DetallesFisicoPage } from './detalles-fisico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesFisicoPageRoutingModule
  ],
  declarations: [DetallesFisicoPage]
})
export class DetallesFisicoPageModule {}
