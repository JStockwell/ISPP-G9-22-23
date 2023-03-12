import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAnalyticPageRoutingModule } from './new-analytic-routing.module';

import { NewAnalyticPage } from './new-analytic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAnalyticPageRoutingModule
  ],
  declarations: [NewAnalyticPage]
})
export class NewAnalyticPageModule {}
