import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarDetallesPageRoutingModule } from './modificar-detalles-routing.module';

import { ModificarDetallesPage } from './modificar-detalles.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ModificarDetallesPageRoutingModule
  ],
  declarations: [ModificarDetallesPage]
})

export class ModificarDetallesPageModule {}