import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesMentalPageRoutingModule } from './detalles-mental-routing.module';

import { DetallesMentalPage } from './detalles-mental.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesMentalPageRoutingModule
  ],
  declarations: [DetallesMentalPage]
})
export class DetallesMentalPageModule {}
