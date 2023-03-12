import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnaliticasPageRoutingModule } from './analiticas-routing.module';

import { AnaliticasPage } from './analiticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnaliticasPageRoutingModule
  ],
  declarations: [AnaliticasPage]
})
export class AnaliticasPageModule {}
