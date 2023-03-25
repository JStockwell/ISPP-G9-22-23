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
  eventos = [
    {
      date: '2023-03-05',
      time: '12:35',
    },
    {
      date: '2023-03-10',
      time: '13:40',
    },
    {
      date: '2023-03-20',
      time: '08:30',
    },
    {
      date: '2023-03-30',
      time: '12:10',
    },
    {
      date: '2023-03-30',
      time: '10:35',
    }
  ];

  fechaSeleccionada = new Date().toISOString();
  citasEnDia: any[] | undefined;
  cantidadCitas: any | undefined;

  constructor(private calendarioService: CalendarioService, private router: Router, private uService: UsersService) { }

  ngOnInit() {
    this.cambiarColorEventos(this.eventos);
  }
  
  nuevaCita() {
    let fechaEnviar = this.fechaSeleccionada;
    this.router.navigate(['/app/Tabs/calendario/nueva-cita'], { queryParams: { fecha: fechaEnviar } });
  }

  onDateChange(event: any) {
    this.fechaSeleccionada = event.detail.value.split('T')[0];
    this.citasEnDia = this.calendarioService.filterByDate(this.fechaSeleccionada);
    this.cantidadCitas = this.citasEnDia.length;
    console.log(this.citasEnDia);
  }

  cambiarColorEventos(lista: any) {
    let colorTextoEvento = 'var(--ion-color-secondary-contrast)';
    let colorFondoEvento = 'var(--ion-color-secondary)';
    for (let item of lista) {
        item["textColor"] = colorTextoEvento;
        item["backgroundColor"] = colorFondoEvento;
    }
    console.log(lista);
  }

  comprobarFechaEnEventos(fecha: any) {
    let fechaParseada = fecha.split('T')[0];
    return this.eventos.find(evento => evento.date === fechaParseada) !== undefined;
  }

  getAppointmentsList(){
    this.calendarioService.getAppointmentsList().subscribe((res) => {
      this.eventos = res;
    })
  }

}
