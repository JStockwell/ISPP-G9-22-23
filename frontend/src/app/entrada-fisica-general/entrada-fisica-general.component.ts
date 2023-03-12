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
  bodyParts!: Array<String>;
  @Input()
  notes!: String;

  constructor() { 
  }

  bodyPartsNotEmpty = () =>{
    if(this.bodyParts){
      return this.bodyParts.length>0;
    } else {
      return false;
    }
  }

  ngOnInit() {}

}
