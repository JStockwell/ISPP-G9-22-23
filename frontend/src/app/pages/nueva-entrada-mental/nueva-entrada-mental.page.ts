import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaEntradaMentalService } from 'src/app/services/nueva-entrada-mental.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-nueva-entrada-mental',
  templateUrl: './nueva-entrada-mental.page.html',
  styleUrls: ['nueva-entrada-mental.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class NuevaEntradaMentalPage implements OnInit{

  estadoFisico:string | undefined
  suenyo:string | undefined
  notas:string | undefined
  comida:string | undefined
  tiempo:string | undefined
  ppositivos:string | undefined
  pnegativos:string | undefined
  today = new Date();

  constructor(private nuevaEntradaMentalService: NuevaEntradaMentalService, private navCtrl: NavController) {}

  ngOnInit() {
  }

 
  nuevaEntrada(){
    let entrada = {
      dia: this.today,
      estadoFisico: this.estadoFisico,
      suenyo: this.suenyo,
      comida: this.comida,
      tiempo: this.tiempo,
      ppositivos: this.ppositivos,
      pnegativos: this.pnegativos,
      notas: this.notas
    }

    console.log(entrada)
  }






}
