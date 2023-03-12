import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

  registros= [
    {
      id:1,
      fecha:'Martes, 7/03/2023',
      positivo:'He hecho deporte',
      notas:'Cuando estoy con mis amigos haciendo deporte me lo paso infinitamente mejor.'
    },
    {
      id:2,
      fecha:'Lunes, 6/03/2023',
      positivo:'He podido ver a mi familia despues de mucho tiempo.',
      notas:'Los dias nublados me hacen sentirme mal normalmente.'
    },
    {
      id:3,
      fecha:'Domingo, 5/03/2023',
      positivo:'He salido a dar un paseo',
      notas:'Me he sentido libre entre la naturaleza. Me gusta recolectar flores.'
    },

  ]

  constructor() {}

}
