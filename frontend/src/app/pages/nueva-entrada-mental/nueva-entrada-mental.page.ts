import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaEntradaMentalService } from 'src/app/services/nueva-entrada-mental.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
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

  constructor(private nuevaEntradaMentalService: NuevaEntradaMentalService, private navCtrl: NavController, private uService: UsersService) {}

  ngOnInit() {
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
  
  crearEntradaMental(): void{
    let dataEntry = {
      date: this.today.toISOString().split('T')[0],
      state: this.estadoFisico,
      weather : this.tiempo,
      food: this.comida,
      sleep: this.suenyo,
      positive_thoughts: this.ppositivos,
      negative_thoughts: this.pnegativos,
      notes: this.notas,
      patient_id: this.getIdUser(),
    }
    console.log(dataEntry);
    
    this.nuevaEntradaMentalService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
        console.log(dataEntry);
        document.location.href="/app/Tabs/DiarioEmocional"
        window.location.href = "/app/Tabs/DiarioEmocional"
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
