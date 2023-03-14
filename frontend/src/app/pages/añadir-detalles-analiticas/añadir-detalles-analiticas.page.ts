import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AñadirDetallesAnaliticasService } from 'src/app/services/añadir-detalles-analiticas.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-añadir-detalles-analiticas',
  templateUrl: './añadir-detalles-analiticas.page.html',
  styleUrls: ['./añadir-detalles-analiticas.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class AñadirDetallesAnaliticasPage implements OnInit{

  nombre: string | undefined
  valor:  Int16Array| undefined
  umbralB: string | undefined 
  umbralA: string | undefined



  constructor(private AñadirDetallesAnaliticasService: AñadirDetallesAnaliticasService, private navCtrl: NavController) {}

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  nuevaEntrada(){
    let entrada = {
      nombre: this.nombre,
      valor: this.valor,
      umbralB: this.umbralB,
      umbralA: this.umbralA
    }

    console.log(entrada)
  }

}
