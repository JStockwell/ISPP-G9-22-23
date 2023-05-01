import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModificarCitaService } from 'src/app/services/modificar-cita.service';
import { UsersService } from 'src/app/services/users.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-modificar-cita',
  templateUrl: './modificar-cita.page.html',
  styleUrls: ['./modificar-cita.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class ModificarCitaPage implements OnInit {

  form:any ={
    fechaYHora: null,
    especialidad:null,
    descripcion:null,
  }

  appointment!:Cita;
  
  isSuccessful = false;
  fechaActual = this.goodTimezone(new Date());
  errorMessage = '';

  constructor(private modificarCitaService: ModificarCitaService, private navCtrl: NavController, private route: ActivatedRoute, private uService: UsersService) { }

  ngOnInit() {
    let idCita = this.route.snapshot.paramMap.get('id')
    this.modificarCitaService.getCita(idCita).subscribe({
      next:data=>{
        this.appointment = data as Cita;
        this.form.especialidad = this.appointment.specialty;
        this.form.descripcion = this.appointment.description;
        this.form.fechaYHora = this.concatenarFechaYHora(this.appointment.date, this.appointment.time);
      },
      error:err=>{
        console.log(err.error.message);
      }
    })
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  concatenarFechaYHora(fechaString: string, horaString: string) {
    let fecha = new Date(fechaString);
    let [horas, minutos, segundos] = horaString.split(':').map(Number);
    fecha.setHours(horas);
    fecha.setMinutes(minutos);
    fecha.setSeconds(segundos);
    let res = this.goodTimezone(fecha);
    return res;
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

  parsearHora(fechaHora: Date) {
    var horas = fechaHora.getHours().toString().padStart(2, '0');
    var minutos = fechaHora.getMinutes().toString().padStart(2, '0');
    var horaParseada = `${horas}:${minutos}`;
    return horaParseada;
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
  
  modificarCita(): void{
    let fechaParseada = new Date(this.form.fechaYHora);
    let dataEntry = {
      date: fechaParseada.toISOString().split('T')[0],
      description: this.form.descripcion,
      specialty: this.form.especialidad,
      time: this.parsearHora(new Date(this.form.fechaYHora)),
      patient_id: this.getUserId(),
    }

    
    this.modificarCitaService.updateEntry(this.route.snapshot.paramMap.get('id'), dataEntry).subscribe({
      next: dataEntry => {

        document.location.href = "/app/Tabs/calendario"
        window.location.href = "/app/Tabs/calendario"
      },
      error: err => {
        this.errorMessage=err.error.message;
        console.log(err);
      }
    })
  }
}

type Cita = {
  id: any,
  date: string,
  time: string,
  specialty: string,
  description: string,
  patient_id: null,
}
