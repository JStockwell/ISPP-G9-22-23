import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaEntradaFisicaService } from 'src/app/services/nueva-entrada-fisica.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-nueva-entrada-fisica',
  templateUrl: './nueva-entrada-fisica.page.html',
  styleUrls: ['./nueva-entrada-fisica.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class NuevaEntradaFisicaPage implements OnInit {

  estadoFisico:string | undefined
  dolores:string | undefined
  notas:string | undefined
  today = new Date();

  constructor(private nuevaEntradFisicaService: NuevaEntradaFisicaService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop(); 
  }
  
  crearEntradaFisica() {
    let dataEntry = {
      state: this.estadoFisico,
      date: this.today,
      body_parts: this.dolores,
      notes: this.notas,
      patient_id: 1,
    }
    
    this.nuevaEntradFisicaService.post(dataEntry)
    .subscribe(res => {
      console.log(dataEntry)
    }, error => {
      console.log(error)
    })
  }

  nuevaEntrada(){
    let entrada = {
      dia: this.today,
      estadoFisico: this.estadoFisico,
      dolores: this.dolores,
      notas: this.notas
    }

    console.log(entrada)
  }
}
