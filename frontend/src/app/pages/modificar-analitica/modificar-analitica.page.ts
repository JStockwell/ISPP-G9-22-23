import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewAnalyticService } from 'src/app/services/new-analytic.service';

import { UsersService } from '../../services/users.service';
import { DetalleAnaliticasService } from 'src/app/services/detalle-analiticas.service';
import { ActivatedRoute } from '@angular/router';
import { ModificarAnaliticaService } from 'src/app/services/modificar-analitica.service';


@Component({
  selector: 'app-modificar-analitica',
  templateUrl: './modificar-analitica.page.html',
  styleUrls: ['./modificar-analitica.page.scss'],
})
export class ModificarAnaliticaPage implements OnInit {

  metric:any |undefined
  umbralAlto:string | undefined
  umbralBajo:string | undefined
  unidad:string | undefined
  constructor(private newAnalyticService: NewAnalyticService, private navCtrl: NavController, private uService: UsersService,
    private analiticaService:DetalleAnaliticasService, private route:ActivatedRoute, private service:ModificarAnaliticaService) { }

  ngOnInit() {
    this.analiticaService.getDetallesAnaliticas(this.route.snapshot.paramMap.get("id")).subscribe({
      next:data=>{
        this.unidad=data.info.unit;
        this.umbralAlto=data.max_value;
        this.umbralBajo=data.min_value;
        this.metric = data;
      },
      error:err=>{
        console.log(err.error.message);
      }
    })
  }

  existsData():boolean{
    return this.metric!=undefined;
  }

  goBack(){
    this.navCtrl.back(); 
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

  modificarAnalitica(): void{
    let dataMetricEntry = {
      min_value: this.umbralBajo,
      max_value: this.umbralAlto,
    }

    
    this.service.modificarAnalitica(this.route.snapshot.paramMap.get('id'), dataMetricEntry).subscribe({
      next: res => {
        window.location.href = "/app/Tabs/Analytics"
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
