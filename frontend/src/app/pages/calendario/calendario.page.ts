import { Component, OnInit } from '@angular/core';
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
      date: '2023-01-05',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2023-01-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
    },
    {
      date: '2023-01-20',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2023-01-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)'
    }
  ];

  constructor(private calendarioService: CalendarioService, private uService: UsersService) { }

  ngOnInit() {
  }

  getAppointmentsList(){
    this.calendarioService.getAppointmentsList().subscribe((res) => {
      this.eventos = res;
    })
  }

}
