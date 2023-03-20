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
  nombres = [
    {
      nombre: 'Azúcar',
      valor: 'azucar',
      unidad: 'mg/dL'
    },
    {
      nombre: 'Tensión',
      valor: 'tension',
      unidad: 'mm Hg'
    },
    {
      nombre: 'Plaquetas',
      valor: 'plaquetas',
      unidad: 'mcL'
    }
  ]
  unidad = '';

  nombre:string | undefined
  valor:string | undefined
  umbralAlto:string | undefined
  umbralBajo:string | undefined
  constructor(private newAnalyticService: NewAnalyticService, private navCtrl: NavController) { }

  ngOnInit() {
    // this.loadNombres();
  }

  // DESCOMENTAR CUANDO ESTÉ EL ENDPOINT
  /* loadNombres() {
    this.newAnalyticService.getNombresAnaliticas().subscribe((res) => {
      console.log(res);
    })
  } */

  /* unidadAnalitica(e) {
    let response = e.detail.value
    if(response in this.nombres) {
      this.unidad = this.nombre.e.unidad
    } else {
      this.unidad = ''
    }
  } */

  goBack(){
    this.navCtrl.pop(); 
  }

  newAnalytic(){
    let analytic = {
      nombre: this.nombre,
      valor: this.valor,
      umbralAlto: this.umbralAlto,
      umbralBajo: this.umbralBajo
    }

    console.log(analytic)
  }

}
