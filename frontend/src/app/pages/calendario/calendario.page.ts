import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UsersService } from 'src/app/services/users.service';
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

  constructor(private calendarioService: CalendarioService, private router: Router, private uService: UsersService) { }

  ngOnInit() {
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

  comprobarFechaEnEventos(fecha: any) {
    let fechaParseada = fecha.split('T')[0];
    return eventos.find(evento => evento.date === fechaParseada) !== undefined;
  }
  
  eliminarCita(idEntrada: any) {
    this.calendarioService.deleteAppointment(idEntrada).subscribe({
      next: res => {
        console.log(res);
        document.location.href="/app/Tabs/calendario"
        window.location.href = "/app/Tabs/calendario"
      },error: err => {
        console.log(err)
      }
    })
  }

}
