import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DiarioEmocionalService } from '../services/diario-emocional.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

  entries:any = [];

  constructor(private diarioEmocionalService: DiarioEmocionalService, private loadingCtrl: LoadingController) {}



  ngOnInit(){
    this.loadEntradasDiarioEmocional();

    
  }
async loadEntradasDiarioEmocional(){

  const loading = await this.loadingCtrl.create({
    message: 'Loading..',
    spinner:'bubbles',
  });

  await loading.present();

  this.diarioEmocionalService.getDiarioEmocional().subscribe((res)=> {
    loading.dismiss();
    this.entries =[res];
    console.log(this.entries)
    console.log("Diario Emocional")
  });

}
 
}

