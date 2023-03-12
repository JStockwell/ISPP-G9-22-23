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
    this.entradas = [new EntradaFisica(new Date(2023, 2, 5), 'Feliz', [], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod dolor sit amet mauris aliquam sagittis ac ut lacus. Nullam ut imperdiet ipsum. Nullam vel sem pellentesque, convallis libero et, dictum sem. Sed faucibus id ex quis consequat.'),
      new EntradaFisica(new Date(2022, 11, 29), 'Triste', ['Pierna', 'Brazo'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ultrices est at facilisis. Etiam bibendum sit amet massa vel commodo. Sed sagittis nunc gravida tortor rutrum, nec tempor justo mollis. Cras interdum massa at odio condimentum vulputate vel eget massa. Maecenas at dui vel sem sagittis tincidunt. Donec facilisis viverra erat, et tincidunt lacus hendrerit sagittis. Praesent nec porttitor neque, nec fringilla ante. Aenean non pulvinar ligula.')]
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
