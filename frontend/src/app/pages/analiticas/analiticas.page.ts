import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';

@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.page.html',
  styleUrls: ['./analiticas.page.scss'],
})
export class AnaliticasPage implements OnInit {
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
      date: '16:34 Jueves, 23/03/2023',
      value: '80',
      metric: 2,
    },
    {
      id: 3,
      date: '18:47 Lunes, 27/03/2023',
      value: '79',
      metric: 2,
    },
  ]

  constructor(private analiticasService: AnaliticasService, private loadingCtrl: LoadingController) {}

  //Se ejecuta al crear la página por parte de angular
  ngOnInit() {
    this.loadAnaliticas();
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
    console.log(this.analiticasService.getAnaliticas);
    console.log(this.analiticas)
  }
}
