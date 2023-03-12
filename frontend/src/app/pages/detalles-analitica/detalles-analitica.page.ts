import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-analitica',
  templateUrl: './detalles-analitica.page.html',
  styleUrls: ['./detalles-analitica.page.scss'],
})
export class DetallesAnaliticaPage implements OnInit {
  nombreAnalitica?:String;
  datos?:Array<Analitica>;


  constructor() { }

  ngOnInit() {
    this.nombreAnalitica = "Azúcar";
    this.datos = [new Analitica(new Date(2023, 1, 25, 17, 30), 175, 'mg/dl'), new Analitica(new Date(2023, 1, 25, 9, 45), 83, 'mg/dl'),
      new Analitica(new Date(2023, 1, 22, 18, 20), 148, 'mg/dl'), new Analitica(new Date(2023, 1, 22, 10, 15), 175, 'mg/dl')]
    let defaultTab = document.getElementById("default");
    defaultTab?.click();
  }

  changeTab = (event:Event, nombreTab:string) =>{
    let contents = document.getElementsByClassName("tabcontent");
    for(let i=0; i<contents.length; i++){
      let content = contents[i] as HTMLElement;
      content.style.display = "None"
    }

    let tablinks = document.getElementsByClassName("tab-button")
    for(let i=0; i<tablinks.length; i++){
      tablinks[i].className = "tab-button";
    }

    let element = document.getElementById(nombreTab) as HTMLElement;
    element.style.display = "block";
    let target = event.currentTarget as HTMLElement;
    target.className += " active"
  }

}

export class Analitica{
  date:Date;
  value:Number;
  unit:String;

  constructor(date:Date, value:Number, unit:String){
    this.date = date;
    this.value = value;
    this.unit = unit;
  }
}
