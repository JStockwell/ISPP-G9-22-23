import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarFisicoPageRoutingModule } from './modificar-fisico-routing.module';

import { ModificarFisicoPage } from './modificar-fisico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarFisicoPageRoutingModule
  ],
  declarations: [ModificarFisicoPage]
})
export class ModificarFisicoPageModule {}
