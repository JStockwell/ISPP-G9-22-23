import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewAnalyticService } from 'src/app/services/new-analytic.service';

@Component({
  selector: 'app-new-analytic',
  templateUrl: './new-analytic.page.html',
  styleUrls: ['./new-analytic.page.scss'],
})
export class NewAnalyticPage implements OnInit {
  metrics = [
    {
      name: 'Azucar',
      unidad: 'mg/dL'
    },
    {
      name: 'Tension',
      unidad: 'mm Hg'
    },
    {
      name: 'Plaquetas',
      unidad: 'mcL'
    }
  ]

  nombre:string | undefined
  valor:string | undefined
  umbralAlto:string | undefined
  umbralBajo:string | undefined
  constructor(private newAnalyticService: NewAnalyticService, private navCtrl: NavController) { }

  ngOnInit() {
    this.infoMetrics();
  }

  // DESCOMENTAR CUANDO ESTÉ EL ENDPOINT
  infoMetrics() {
    this.newAnalyticService.getMetricInfo().subscribe((res) => {
      console.log(res);
    })
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  crearNuevaAnalitica() {
    let metricDataEntry = {
      name: this.nombre,
      maxValue: this.umbralAlto,
      minValue: this.umbralBajo,
      patient_id: 1,
    }
    
    let measureDataEntry = {
      value: this.valor,
      metric: this.nombre,
      patient_id: 1,
    }

    this.newAnalyticService.postMetric(metricDataEntry)
    .subscribe((res) => {
      console.log(res)
    }, error => {
      console.log(error)
    })

    this.newAnalyticService.postMeasure(measureDataEntry)
    .subscribe((res) => {
      console.log(res)
    }, error => {
      console.log(error)
    })
  }

}
