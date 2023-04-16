import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicHomePageRoutingModule } from './medic-home-routing.module';

import { MedicHomePage } from './medic-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicHomePageRoutingModule
  ],
  declarations: [MedicHomePage]
})
export class MedicHomePageModule {}
