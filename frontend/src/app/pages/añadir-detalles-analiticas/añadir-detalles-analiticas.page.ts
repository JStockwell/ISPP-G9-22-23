import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AñadirDetallesAnaliticasService } from 'src/app/services/añadir-detalles-analiticas.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-añadir-detalles-analiticas',
  templateUrl: './añadir-detalles-analiticas.page.html',
  styleUrls: ['./añadir-detalles-analiticas.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class AñadirDetallesAnaliticasPage implements OnInit{

  valor:  Int16Array| undefined



  constructor(private route: ActivatedRoute,private AñadirDetallesAnaliticasService: AñadirDetallesAnaliticasService, private navCtrl: NavController, private uService: UsersService ) {}

  form:any ={
    valor:null
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
  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  nuevaEntrada(){
    let id:string = this.route.snapshot.params["id"];
    let value:any = this.form.valor;

    let entrada = {
      metric_id: parseInt(id),
      value: value,
      patient_id: this.getIdUser(),
    }

    this.AñadirDetallesAnaliticasService.postEntry(entrada).subscribe({
      next: data => {
        window.location.href = "/app/Tabs/Analytics/Details/" + entrada.metric_id; 
    },
      error: error => {
        console.log(error);
      }
    })
  }
}
