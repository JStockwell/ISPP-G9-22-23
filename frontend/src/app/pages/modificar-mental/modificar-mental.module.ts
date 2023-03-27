import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ModificarMentalPage } from './modificar-mental.page';

import { ModificarMentalPageRoutingModule } from './modificar-mental-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarMentalPageRoutingModule
  ],
  declarations: [ModificarMentalPage]
})

export class ModificarMentalPageModule {}
