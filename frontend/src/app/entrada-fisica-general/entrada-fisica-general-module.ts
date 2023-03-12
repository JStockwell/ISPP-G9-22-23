import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";

import { EntradaFisicaGeneralComponent } from "./entrada-fisica-general.component";

@NgModule({
    imports:[
        IonicModule,
        CommonModule,
        IonicModule
    ],
    declarations: [EntradaFisicaGeneralComponent],
    exports: [EntradaFisicaGeneralComponent],
}) export class EntraFisicaGeneralComponentModule {}