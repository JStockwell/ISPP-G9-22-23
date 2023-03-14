import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NuevaEntradaMentalPage } from './nueva-entrada-mental.page';


import { NuevaEntradaMentalPageRoutingModule } from './nueva-entrada-mental-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NuevaEntradaMentalPageRoutingModule
  ],
  declarations: [NuevaEntradaMentalPage]
})
export class NuevaEntradaMentalPageModule {}
