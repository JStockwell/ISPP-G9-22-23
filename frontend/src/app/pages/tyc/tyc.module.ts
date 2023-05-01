import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { tycPageRoutingModule } from './tyc-routing.module';

import { tycPage } from './tyc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    tycPageRoutingModule
  ],
  declarations: [tycPage]
})
export class tycPageModule {}