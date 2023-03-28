import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarMentalPageRoutingModule } from './modificar-mental-routing.module';

import { ModificarMentalPage } from './modificar-mental.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ModificarMentalPageRoutingModule
  ],
  declarations: [ModificarMentalPage]
})

export class ModificarMentalPageModule {}