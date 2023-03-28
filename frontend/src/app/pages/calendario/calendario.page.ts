import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  public eventos = [
    {
      date: '2000-01-01',
      time: '00:00',
    },
  ];

  fechaSeleccionada = new Date().toISOString();
  citasEnDia: any[] | undefined;
  cantidadCitas: any | undefined;

  constructor(private calendarioService: CalendarioService, private router: Router, private uService: UsersService) { }

  ngOnInit() {
    this.getAppointmentsList();
  }
  
  nuevaCita() {
    let fechaEnviar = this.fechaSeleccionada;
    this.router.navigate(['/app/Tabs/calendario/nueva-cita'], { queryParams: { fecha: fechaEnviar } });
  }

  onDateChange(event: any) {
    this.fechaSeleccionada = event.detail.value.split('T')[0];
    this.citasEnDia = this.calendarioService.filterByDate(this.fechaSeleccionada, this.eventos);
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
    return this.eventos.find(evento => evento.date === fechaParseada) !== undefined;
  }

  getAppointmentsList(){
    this.calendarioService.getAppointmentsList().subscribe((res) => {
      this.cambiarColorEventos(res);
      this.cambiarFormatoHora(res);
      Object.assign(this.eventos, res);
    }
  )}

}
