import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaEntradaMentalService } from 'src/app/services/nueva-entrada-mental.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
registerLocaleData(localeEs, 'es');

import { AlertController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

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
  regla:boolean | undefined
  today = new Date();
  errorMessage = '';
  errorMessageEstado = '';
  errorMessageTiempo= '';
  errorMessageComida = '';
  errorMessageSuenyo = '';
  dtAux:string = "";

  public mostrarAlerta = false;

  constructor(private nuevaEntradaMentalService: NuevaEntradaMentalService, private navCtrl: NavController, private uService: UsersService, private alertController: AlertController) {}

  ngOnInit() {
    var aux = this.today.toLocaleDateString("es-ES", { weekday: 'long'});
    this.dtAux = aux.charAt(0).toUpperCase() + aux.substring(1) + ', ' + this.today.toLocaleDateString();
    this.getRegla();
  }

  goBack(){
    this.navCtrl.pop(); 
  }


  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
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
      period_now : this.regla,
      positive_thoughts: this.ppositivos,
      negative_thoughts: this.pnegativos,
      notes: this.notas,
      patient_id: this.getIdUser(),
    }
    console.log(dataEntry);
    
    this.nuevaEntradaMentalService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
        console.log(dataEntry);
        document.location.href="/app/Tabs/seccion-mental"
        window.location.href = "/app/Tabs/seccion-mental"
      },
      error: err => {
        if( err.error.error ){
          this.errorMessage= '* ' + err.error.error; 
          //window.alert(this.errorMessage);
        }
        else if( err.error.state && err.error.weather && err.error.food && err.error.sleep){
          this.errorMessage = '* No puedes dejar los campos de estado, sueño, comida y tiempo sin seleccionar'
          //window.alert(this.errorMessage);
          console.log(err);
        }
        else{
          if(err.error.state){
            this.errorMessageEstado = "* No puedes dejar el campo de estado sin selecionar";
            //window.alert(this.errorMessageEstado);
          }
          if(err.error.weather){
            this.errorMessageTiempo = "* No puedes dejar el campo de tiempo sin selecionar";
            //window.alert(this.errorMessageTiempo);
          }
          if(err.error.sleep){
            this.errorMessageSuenyo = "* No puedes dejar el campo de sueño sin selecionar";
            //window.alert(this.errorMessageTiempo);
          }
          if(err.error.food){
            this.errorMessageComida = "* No puedes dejar el campo de comida sin selecionar";
            //window.alert(this.errorMessageComida);
          }
          
          console.log(err);
          
          

        }
       

      }
    })
  }

  existsErrores = () =>{
    if (this.errorMessage){
      return this.errorMessage.length>0;
    } else{
      return false;
    }
  }

  
  getRegla(){
   
    this.uService.getUserData().subscribe({
      
      next: data => {
        console.log(data.has_period)
        this.regla = data.has_period;

        
      },
      error: err => {
        console.log(err);

      }
      
    })
    
  }

}
