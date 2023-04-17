import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioFisicoPageRoutingModule } from './calendario-fisico-routing.module';

import { CalendarioFisicoPage } from './calendario-fisico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioFisicoPageRoutingModule
  ],
  declarations: [CalendarioFisicoPage]
})
export class CalendarioFisicoPageModule {}
