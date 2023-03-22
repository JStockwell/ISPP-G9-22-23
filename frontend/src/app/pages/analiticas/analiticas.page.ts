import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import Chart from 'chart.js/auto';
import {UsersService} from '../../services/users.service'



@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.page.html',
  styleUrls: ['./analiticas.page.scss'],
})


export class AnaliticasPage implements OnInit {
  
  msg:any;
  bars: any;
  colorArray: any;
  errorMessage = '';
  //BORRAR eso más adelante cuando ya estén las llamadas
  analiticas = new Array<analitica>
  mediciones = new Array<measure>

  constructor(private analiticasService: AnaliticasService, private loadingCtrl: LoadingController, private uService: UsersService) {}

  //Se ejecuta al crear la página por parte de angular
  ngOnInit() {
   this.createAnaliticas()
  }

  createAnaliticas(){

    this.analiticasService.getAnaliticas().subscribe({
      next: data =>{
        this.analiticas=data;
        this.createMeasures();
      },
      error: err => {
        this.errorMessage=err.error.message;

      }
    });
  }

  createMeasures(){
    this.analiticasService.getAnaliticaDetails().subscribe({
      next: data => {
        this.mediciones = data;
        this.createChart();
      },
      error: err =>{
        this.errorMessage = err.errorMessage;
      }
    })
  }
 

  createChart(){
    for (const analitica of this.analiticas){
      let id = analitica.id;
      let str = "chart"+id;
      let aux = <HTMLCanvasElement> document.getElementById(str);
      const ctx = aux.getContext("2d");

      if(ctx != null){
        const dates: String[] = [];
        const values: String[] = [];
        for( const medicion of this.mediciones){
          if(medicion.metric.id == analitica.id){
            let date:Date = medicion.date;
            const aux = date.toString().substring(0,9);
            dates.push(aux);
            values.push(medicion.value);
          }
          
        }
        Chart.defaults.color = 'black';
        Chart.defaults.backgroundColor = '#f4f5f9';

        const mensaje: string='Resultados de la analítica('+analitica.info.unit+')'
        this.bars = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: mensaje,
              data: values,
              backgroundColor: "light", 
              borderColor: "light", 
              borderWidth: 1
            }]
          }
        });
      }
      
    }
  
  }
}
type analitica = {
  id: null,
  info:{
    name: null,
    unit: null,
  },
  min_value: null,
  max_value: null,
};
type measure = {
  id: null,
  date: any,
  metric:{
    id: null,
    min_value:null,
    max_value:null,
    info:{
      name:null,
      unit:null
    }
    patient_id:null
  },
  patient_id:null,
  value:any
};
