import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-fisica',
  templateUrl: './seccion-fisica.page.html',
  styleUrls: ['./seccion-fisica.page.scss'],
})
export class SeccionFisicaPage implements OnInit {
  entradas!:Array<EntradaFisica>
  constructor() { }

  existsEntradas = () =>{
    if (this.entradas){
      return this.entradas.length>0;
    } else{
      return false;
    }
  }

  ngOnInit() {
    this.entradas = [new EntradaFisica(new Date(2023, 2, 5), '/images/cara-feliz', [], 'Ayer me encontré bien, nada más que añadir'),
      new EntradaFisica(new Date(2022, 11, 29), '/images/cara-triste', ['/images/brazo-derecho', '/images/brazo-izquierdo'], 'El dolor en el brazo derecho era constante e irritante.')]
  }

}

export class EntradaFisica{
  date: Date;
  state: String;
  bodyParts: Array<String>;
  notes: String;

  constructor(date:Date, state:String, bodyParts: Array<String>, notes:String){
    this.date = date;
    this.state = state;
    this.bodyParts = bodyParts;
    this.notes = notes;
  }

}
