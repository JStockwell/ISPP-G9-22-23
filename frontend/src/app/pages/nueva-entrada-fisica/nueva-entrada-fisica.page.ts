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

  estadoFisico:string | any = '';
  dolores:string | any = '';
  deporte:boolean | any = false;
  notas:string | any = '';
  today = new Date();
  errorMessage = '';
  errorMessageEstado = '';

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
    let dataEntry:any;
    if(parts == ''){
        dataEntry = {
        date: this.today.toISOString().split('T')[0],
        state: this.estadoFisico,
        done_exercise: this.deporte,
        patient_id: this.getIdUser(),
      };
    }else{
      dataEntry = {
        date: this.today.toISOString().split('T')[0],
        state: this.estadoFisico,
        body_parts: parts,
        done_exercise: this.deporte,
        patient_id: this.getIdUser(),
      };
    }
    if(this.notas != ""){
      dataEntry["notes"]=this.notas;
    }
    
    console.log(dataEntry);
    this.nuevaEntradFisicaService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
        document.location.href="/app/Tabs/seccion-fisica"
        window.location.href = "/app/Tabs/seccion-fisica"
      },
      error: err => {
        console.log(err);
        if( err.error.error ){
          this.errorMessage= '* ' + err.error.error; 
          window.alert(this.errorMessage);
        }
        else if( err.error.state ){
          this.errorMessageEstado = '* No puedes dejar el campo de estado sin seleccionar'
          window.alert(this.errorMessageEstado);
          console.log(err);
        }
      }
    })
  }
  
}
