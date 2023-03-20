import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  metrics:any[] | undefined
  
  nombre:string | undefined
  unidad:string | undefined
  umbralAlto:string | undefined
  umbralBajo:string | undefined
  constructor(private newAnalyticService: NewAnalyticService, private navCtrl: NavController, private uService: UsersService) { }

  ngOnInit() {
    this.listMetricsInfo();
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
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
    this.newAnalyticService.getMetricsInfoList().subscribe((res) => {
      this.metrics = res;
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
    let dataEntry = {
      name: this.nombre,
      unit: this.unidad,
      min_value: this.umbralBajo,
      max_value: this.umbralAlto,
      patient_id: this.getIdUser(),
    }
    console.log(dataEntry);
    
    this.newAnalyticService.postEntry(dataEntry).subscribe({
      next: dataEntry => {
        console.log(dataEntry);
        document.location.href="http://localhost:8100/app/Tabs/Analytics"
        window.location.href = "http://localhost:8100/app/Tabs/Analytics"
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
