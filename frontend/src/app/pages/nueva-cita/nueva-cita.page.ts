import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaCitaService } from 'src/app/services/nueva-cita.service';
import { UsersService } from 'src/app/services/users.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.page.html',
  styleUrls: ['./nueva-cita.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class NuevaCitaPage implements OnInit {

  fechaRecibida = new Date();
  dtAux:string = "" ;
  
  form:any ={
    fecha: null,
    fechaYHora: null,
    especialidad:null,
    descripcion:null,
  }
  
  isSuccessful = false;
  fechaActual = this.goodTimezone(new Date());
  errorMessage = '';

  constructor(private nuevaCitaService: NuevaCitaService, private navCtrl: NavController, private route: ActivatedRoute, private uService: UsersService) {
    this.route.queryParams.subscribe(params => {
      if (params && params['fecha']) {
         this.form.fechaYHora = new Date(params['fecha']).toISOString();
      }
    });
  }

  ngOnInit() {
    let Aux:Date = new Date(this.fechaRecibida);
    var aux = Aux.toLocaleDateString("es-ES", { weekday: 'long'});
    this.dtAux = aux.charAt(0).toUpperCase() + aux.substring(1) + ', ' + Aux.toLocaleDateString();
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  parsearHora(fechaHora: Date) {
    var horas = fechaHora.getHours().toString().padStart(2, '0');
    var minutos = fechaHora.getMinutes().toString().padStart(2, '0');
    var horaParseada = `${horas}:${minutos}`;
    return horaParseada;
  }

  goodTimezone(fecha: any) {
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    let hours = fecha.getHours();
    let minutes = fecha.getMinutes();
    let seconds = fecha.getSeconds();
    let isoDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return isoDate;
  }

  getUserId(){
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
  
  crearNuevaCita(): void{
    let fechaParseada = new Date(this.form.fechaYHora);
    let dataEntry = {
      date: fechaParseada.toISOString().split('T')[0],
      description: this.form.descripcion,
      specialty: this.form.especialidad,
      time: this.parsearHora(new Date(this.form.fechaYHora)),
      patient_id: this.getUserId(),
    }
    
    this.nuevaCitaService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
     
        document.location.href = "/app/Tabs/calendario"
        window.location.href = "/app/Tabs/calendario"
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
