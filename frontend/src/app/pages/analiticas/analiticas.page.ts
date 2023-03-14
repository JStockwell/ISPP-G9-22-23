import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.page.html',
  styleUrls: ['./analiticas.page.scss'],
})
export class AnaliticasPage implements OnInit {
  

  bars: any;
  colorArray: any;
  //BORRAR eso más adelante cuando ya estén las llamadas
  analiticas = [
    {
      id: 1,
      name: 'azucar',
      unit: 'g/L',
      min_value: '56',
      max_value: '80',
    },
    {
      id: 2,
      name: 'colesterol',
      unit: 'g/L',
      min_value: '70',
      max_value: '92',
    },
  ];

  mediciones = [
    {
      id: 1,
      date: '16:34 Jueves, 23/03/2023',
      value: '57',
      metric: 1,
    },
    {
      id: 2,
      date: '17:00 Lunes, 27/03/2023',
      value: '55',
      metric: 1,
    },
    {
      id: 3,
      date: '16:34 Jueves, 28/03/2023',
      value: '56',
      metric: 1,
    },
    {
      id: 4,
      date: '17:00 Viernes, 29/03/2023',
      value: '70',
      metric: 1,
    },
    {
      id: 5,
      date: '16:34 Jueves, 30/03/2023',
      value: '60',
      metric: 1,
    },
    {
      id: 6,
      date: '17:00 Lunes, 31/03/2023',
      value: '56',
      metric: 1,
    },
    {
      id: 7,
      date: '16:34 Jueves, 01/04/2023',
      value: '58',
      metric: 1,
    },
    {
      id: 8,
      date: '17:00 Lunes, 03/04/2023',
      value: '60',
      metric: 1,
    }, 
    {
      id: 8,
      date: '16:34 Jueves, 05/04/2023',
      value: '57',
      metric: 1,
    },
    {
      id: 9,
      date: '17:00 Lunes, 06/04/2023',
      value: '55',
      metric: 1,
    },

    {
      id: 10,
      date: '16:34 Jueves, 07/04/2023',
      value: '50',
      metric: 1,
    },
    {
      id: 11,
      date: '18:47 Lunes, 27/03/2023',
      value: '79',
      metric: 2,
    },
    {
      id: 12,
      date: '18:47 Lunes, 28/03/2023',
      value: '60',
      metric: 2,
    },
    {
      id: 13,
      date: '18:47 Lunes, 29/03/2023',
      value: '89',
      metric: 2,
    },
    {
      id: 14,
      date: '18:47 Lunes, 30/03/2023',
      value: '74',
      metric: 2,
    },
    {
      id: 15,
      date: '18:47 Lunes, 31/03/2023',
      value: '70',
      metric: 2,
    },
    {
      id: 16,
      date: '18:47 Lunes, 01/04/2023',
      value: '75',
      metric: 2,
    },
  ]

  constructor(private analiticasService: AnaliticasService, private loadingCtrl: LoadingController) {}

  //Se ejecuta al crear la página por parte de angular
  ngOnInit() {
    this.loadAnaliticas();

  }

  ionViewDidEnter() {
    this.createChart();
  }

  async loadAnaliticas(){
    //DESCOMENTAR
    /*
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();


    this.analiticasService.getAnaliticas().subscribe(res => {
      loading.dismiss();
      this.analiticas = [...this.analiticas, ...res.results];
      console.log(res); 
    })
    */
    //console.log(this.analiticasService.getAnaliticas);
    //console.log(this.analiticas)
    
  }

  createChart(){
    for (const analitica of this.analiticas){
      let nombre = analitica.name;
      let str = "chart"+nombre;
      
      let aux = <HTMLCanvasElement> document.getElementById(str);
      //console.log(aux)
      const ctx = aux.getContext("2d");
      if(ctx != null){
        //console.log(ctx);

        const dates: String[] = [];
        const values: String[] = [];
        for( const medicion of this.mediciones){
          if(medicion.metric == analitica.id){

            const aux = medicion.date.split(" ");
            //console.log(aux);
            dates.push(aux[2]);
            values.push(medicion.value)
          }
          
        }
        Chart.defaults.color = 'black';
        Chart.defaults.backgroundColor = '#f4f5f9';

        const mensaje: string='Resultados de la analítica('+analitica.unit+')'
        this.bars = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: mensaje,
              data: values,
              backgroundColor: "light", // array should have same number of elements as number of dataset
              borderColor: "light", // array should have same number of elements as number of dataset
              
              borderWidth: 1
            }]
          }
        });
      }
      
    }
  
  }
}
