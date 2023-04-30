import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewAnalyticService } from 'src/app/services/new-analytic.service';

import { UsersService } from '../../services/users.service';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":" Token 481d943276a0f7ce3966f137c256587fdbd166a5"})
};

@Component({
  selector: 'app-new-analytic',
  templateUrl: './new-analytic.page.html',
  styleUrls: ['./new-analytic.page.scss'],
})
export class NewAnalyticPage implements OnInit {
  metrics:any[] = [];
  
  nombre:string | undefined
  unidad:string | undefined
  valor:string | undefined
  umbralAlto:string | undefined
  umbralBajo:string | undefined
  constructor(private newAnalyticService: NewAnalyticService, private navCtrl: NavController, private uService: UsersService) { }

  ngOnInit() {
    this.listMetricsInfo();
  }

  goBack(){
    this.navCtrl.back(); 
  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        return res[1];
      }
    }
  }

  listMetricsInfo() {
    this.newAnalyticService.getMetricsNotUsedList().subscribe({
      next: res => {
        this.metrics = res;
      },error: err => {
        console.log(err)
      }
    })
  }

  getMetricUnit() {
    var metric = this.nombre;
    var metricsList: any = this.metrics;
    var result = '';
    if(metric) {
      result = metricsList.find((metrica: { name: string; }) => metrica.name === metric).unit
    }
    this.unidad = result;
    return result;
  }
  
  crearNuevaAnalitica(): void{
    let dataMetricEntry = {
      name: this.nombre,
      unit: this.getMetricUnit(),
      min_value: this.umbralBajo,
      max_value: this.umbralAlto,
      patient_id: this.getIdUser(),
    }
    console.log(dataMetricEntry)
    
    const ans = this.newAnalyticService.postMetricEntry(dataMetricEntry).subscribe({
      next: res => {
        let dataMeasureEntry = {
          metric_id: res.metric_id,
          value: this.valor,
          patient_id: this.getIdUser(),
        }
        console.log(dataMeasureEntry)
        this.newAnalyticService.postMeasureEntry(dataMeasureEntry).subscribe({
          next: res => {
            console.log(res);
          }, error: err => {
            console.log(err);
          }
        })
        window.location.href = "/app/Tabs/Analytics"
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
