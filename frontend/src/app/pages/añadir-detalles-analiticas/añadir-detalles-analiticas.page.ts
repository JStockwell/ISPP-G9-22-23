import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AñadirDetallesAnaliticasService } from 'src/app/services/añadir-detalles-analiticas.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-añadir-detalles-analiticas',
  templateUrl: './añadir-detalles-analiticas.page.html',
  styleUrls: ['./añadir-detalles-analiticas.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class AñadirDetallesAnaliticasPage implements OnInit{

  valor:  Int16Array| undefined



  constructor(private AñadirDetallesAnaliticasService: AñadirDetallesAnaliticasService, private navCtrl: NavController, private uService: UsersService ) {}

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  nuevaEntrada(){
    let entrada = {
      valor: this.valor
    }

    console.log(entrada)

    this.AñadirDetallesAnaliticasService.postEntry(entrada).subscribe({
      next: entrada => {
        console.log(entrada);
        window.location.href = "/app/Tabs/Analytics"
    },
      error: error => {
        console.log(error);
      }
    })
  }
}
