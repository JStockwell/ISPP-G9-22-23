import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
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
  medicionesAux = new Array<measure>
  constructor(private analiticasService: AnaliticasService, private loadingCtrl: LoadingController, private uService: UsersService, private alertController: AlertController) {}

  //Se ejecuta al crear la página por parte de angular
  ngOnInit() {
   this.createAnaliticas()
  }


  async deleteAnalitica(id_analitica:any){
    const alert = await this.alertController.create({
      header:'Confirme',
      message:'¿Está seguro de que quiere borrar esta analítica?',
      buttons:[{
        text:'Sí',
        role:'yes',
        handler: ()=>{
          this.analiticasService.deleteAnalitica(id_analitica).subscribe({
            next:data=>{
              window.location.reload();
            },
            error:err=>{
              this.errorMessage=err.error.message;
            }
          });
        }
      }, {
        text:'No',
        role:'no',
        handler: ()=>{
          return null;
        }
      }]
    })

    await alert.present();
  }

  createAnaliticas(){

    this.analiticasService.getAnaliticas().subscribe({
      next: data =>{
        this.analiticas=data;
        for(var analitica of this.analiticas){
          this.createMeasuresv2(analitica)
        }
      },
      error: err => {
        this.errorMessage=err.error.message;

      }
    });
  }

  createMeasuresv2(analitica:any){
    this.analiticasService.getLatestDetails(analitica.id).subscribe({
      next: data =>{
        for(var metric of data){
          let date:Date = metric.date;
          const aux = date.toString().substring(0,10);
          
          this.mediciones.push(metric);
          console.log(metric.date)
        }
        const data2 = data.reverse();
        for(var met of data2){
          let date:Date = met.date;
          const aux = date.toString().substring(0,10);
          const aux2 = date.toString().substring(11,16);
          met.date = aux+" "+aux2 + "h";
          this.medicionesAux.push(met);
        } 
        this.createChart(analitica);
      },
      error: err => {
        this.errorMessage=err.error.message;
      }
    })
  }

  createChart(analitica:any){

      let str = "chart"+analitica.id;
      let aux = <HTMLCanvasElement> document.getElementById(str);
      const ctx = aux.getContext("2d");
      if(ctx != null){
        const dates: String[] = [];
        const values: String[] = [];
        const dataLower: any[] = [];
        const dataUpper: any[] = [];
        for( const medicion of this.medicionesAux){
          if(medicion.metric.id == analitica.id){
            let date:Date = medicion.date;
            const aux = date.toString().substring(0,10);
            dates.push(aux);
            values.push(medicion.value);
            dataLower.push(medicion.metric.min_value);
            dataUpper.push(medicion.metric.max_value);
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
            },
            {
              label: " Umbrales",
              data: dataLower,
              borderColor: "darkorange",
              backgroundColor:"darkorange",
              pointRadius: 0
            },
            {
              label:"",
              data: dataUpper,
              borderColor: "darkorange",
              backgroundColor:"darkorange",
              pointRadius: 0
            }
          ]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false
        }
        });
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
