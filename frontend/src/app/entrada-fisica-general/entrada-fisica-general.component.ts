import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada-fisica-general',
  templateUrl: './entrada-fisica-general.component.html',
  styleUrls: ['./entrada-fisica-general.component.scss'],
})
export class EntradaFisicaGeneralComponent implements OnInit {
  @Input()
  date!: String;
  @Input()
  state!: String;
  @Input()
  bodyParts!: String;
  @Input()
  notes!: String;

  array_bodyParts:any

  constructor() { 
  }

  bodyPartsNotEmpty = () =>{
    if(this.bodyParts){
      return this.bodyParts.length>0;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.array_bodyParts = this.bodyParts.split(",")
  }

}
