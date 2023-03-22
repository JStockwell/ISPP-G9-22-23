import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaEntradaFisicaService } from 'src/app/services/nueva-entrada-fisica.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { UsersService } from '../../services/users.service';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":" Token 481d943276a0f7ce3966f137c256587fdbd166a5"})
};

@Component({
  selector: 'app-nueva-entrada-fisica',
  templateUrl: './nueva-entrada-fisica.page.html',
  styleUrls: ['./nueva-entrada-fisica.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class NuevaEntradaFisicaPage implements OnInit {

  estadoFisico:string | undefined
  dolores:string | undefined
  deporte:boolean | undefined
  notas:string | undefined
  today = new Date();

  constructor(private nuevaEntradFisicaService: NuevaEntradaFisicaService, private navCtrl: NavController, private uService: UsersService) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  painsToString(dolores: any) {
    const json = JSON.stringify(dolores);
    const string: string[] = JSON.parse(json);
    const result = string.join(',');

    return result;
  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        return res[1];
      }
    }
  }
  
  crearEntradaFisica(): void{
    let parts = ''
    if (this.dolores) {
      parts = this.painsToString(this.dolores);
    }
    let dataEntry = {
      date: this.today.toISOString().split('T')[0],
      state: this.estadoFisico,
      body_parts: parts,
      done_exercise: this.deporte,
      notes: this.notas,
      patient_id: this.getIdUser(),
    }
    
    this.nuevaEntradFisicaService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
        console.log(dataEntry);
        document.location.href="http://localhost:8100/app/Tabs/seccion-fisica"
        window.location.href = "http://localhost:8100/app/Tabs/seccion-fisica"
      },
      error: err => {
        console.log(err);
      }
    })
  }
  
}
