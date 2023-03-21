import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevaCitaService } from 'src/app/services/nueva-cita.service';
import { UsersService } from 'src/app/services/users.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.page.html',
  styleUrls: ['./nueva-cita.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class NuevaCitaPage implements OnInit {
  // especialidades:any[] | undefined
  // DESCOMENTAR LO DE ARRIBA Y BORRAR LA VARIABLE DE ABAJO CUANDO ESTÉ EL ENDPOINT
  especialidades = [
    {id: 1,
    name: "Dermatología"},
    {id: 2,
    name: "Traumatología"},
    {id: 3,
    name: "Oftalmología"},
  ]

  fecha = new Date(); 
  fechaHora = new Date().toISOString();
  especialidad:string | undefined
  observaciones:string | undefined

  constructor(private nuevaCitaService: NuevaCitaService, private navCtrl: NavController, private uService: UsersService) { }

  ngOnInit() {
    // DESCOMENTAR CUANDO ESTÉ EL ENDPOINT
    // this.listSpecialties(); 
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

  listSpecialties() {
    this.nuevaCitaService.getSpecialtiesList().subscribe((res) => {
      this.especialidades = res;
    })
  }
  
  crearNuevaCita(): void{
    let dataEntry = {
      date: this.fecha.toISOString().split('T')[0],
      description: this.observaciones,
      specialty: this.especialidad,
      time: this.fechaHora.replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1"),
      patient_id: this.getUserId(),
    }
    console.log(dataEntry);
    
    /*this.nuevaCitaService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
        console.log(dataEntry);
        document.location.href="http://localhost:8100/app/Tabs/seccion-fisica"
        window.location.href = "http://localhost:8100/app/Tabs/seccion-fisica"
      },
      error: err => {
        console.log(err);
      }
    })*/
  }

}
