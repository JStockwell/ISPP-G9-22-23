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
  fechaHora = new Date().toISOString();
  especialidad:string | undefined
  observaciones:string | undefined
  dtAux:string = "" ;

  constructor(private nuevaCitaService: NuevaCitaService, private navCtrl: NavController, private route: ActivatedRoute, private uService: UsersService) {
    this.route.queryParams.subscribe(params => {
      if (params && params['fecha']) {
         this.fechaRecibida = params['fecha'];
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

  getUserId(){
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
  
  crearNuevaCita(): void{
    let fechaParseada = new Date(this.fechaRecibida);
    let dataEntry = {
      date: fechaParseada.toISOString().split('T')[0],
      description: this.observaciones,
      specialty: this.especialidad,
      time: this.parsearHora(new Date(this.fechaHora)),
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
