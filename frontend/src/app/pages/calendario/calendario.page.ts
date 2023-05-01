import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import { eventos } from '../../services/settings';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  eventos = eventos;
  fechaSeleccionada = new Date().toISOString();
  citasEnDia: any[] | undefined;
  cantidadCitas: any | undefined;

  constructor(private calendarioService: CalendarioService, private router: Router) { }

  ngOnInit() {
    this.getAppointmentsList();
  }
  
  nuevaCita() {
    let fechaEnviar = this.fechaSeleccionada;
    this.router.navigate(['/app/Tabs/calendario/nueva-cita'], { queryParams: { fecha: fechaEnviar } });
  }

  onDateChange(event: any) {
    this.fechaSeleccionada = event.detail.value.split('T')[0];
    this.citasEnDia = this.calendarioService.filterByDate(this.fechaSeleccionada, eventos);
    this.cantidadCitas = this.citasEnDia.length;
  }

  cambiarColorEventos(lista: any) {
    let colorTextoEvento = 'var(--ion-color-secondary-contrast)';
    let colorFondoEvento = 'var(--ion-color-secondary)';
    for (let item of lista) {
        item["textColor"] = colorTextoEvento;
        item["backgroundColor"] = colorFondoEvento;
    }
  }

  cambiarFormatoHora(jsonEventos: any[]) {
    jsonEventos.forEach((item: any) => {
      let [horas, minutos, segundos] = item.time.split(':');
      let nuevaHora = `${horas}:${minutos}`;
      item.time = nuevaHora;
    });
  }

  comprobarFechaEnEventos(fecha: any) {
    let fechaParseada = fecha.split('T')[0];
    return eventos.find(evento => evento.date === fechaParseada) !== undefined;
  }

  getAppointmentsList(){
    this.calendarioService.getAppointmentsList().subscribe((res) => {
      this.cambiarColorEventos(res);
      this.cambiarFormatoHora(res);
      Object.assign(eventos, res);
    }
  )}
  
  eliminarCita(idEntrada: any) {
    this.calendarioService.deleteAppointment(idEntrada).subscribe({
      next: res => {

        document.location.href="/app/Tabs/calendario"
        window.location.href = "/app/Tabs/calendario"
      },error: err => {
        console.log(err)
      }
    })
  }

}
