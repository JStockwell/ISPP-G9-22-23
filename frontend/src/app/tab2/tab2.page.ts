import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AnaliticasService } from '../services/analiticas.service';
import { DiarioEmocionalService } from '../services/diario-emocional.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

  entries:any = [];

  constructor(private diarioEmocionalService: DiarioEmocionalService, private loadingCtrl: LoadingController, private analiticasService: AnaliticasService) {}



  ngOnInit(){
    this.loadEntradasDiarioEmocional();

    
  }
async loadEntradasDiarioEmocional(){

  const loading = await this.loadingCtrl.create({
    message: 'Cargando..',
    spinner:'bubbles',
  });

  await loading.present();

  this.diarioEmocionalService.getDiarioEmocional().subscribe((res)=> {
    for(var entrada of res){
      let date:Date = entrada.date;
      entrada.date=this.analiticasService.dateFormatter_entradas(date);
      this.entries.push(entrada);
    }
    loading.dismiss();

  });

}


existsEntradas = () =>{
  if (this.entries){
    return this.entries.length>0;
  } else{
    return false;
  }
}

getImagenEstado(imagen:string): any {
  if(imagen == "G" ){
    return "/assets/images/cara-feliz.png";
  }
  if(imagen == "VG" ){
    return "/assets/images/cara-muy-feliz.png";
  }
  
  if(imagen == "F" ){
    return "/assets/images/cara-neutral.png";
  }
  
  if(imagen == "B" ){
    return "/assets/images/cara-triste.png";
  }
  
  if(imagen == "VB" ){
    return "/assets/images/cara-muy-triste.png";
  }
  

  
}

getImagenComida(imagen:string): any {
  if(imagen == "HEALTHY" ){
    return "/assets/images/salad.png";
  }
  if(imagen == "FAST" ){
    return "/assets/images/hamburger.png";
  }
  
  if(imagen == "NONE" ){
    return "/assets/images/plato.png";
  }
  

  

}

getImagenSuenyo(imagen:string): any {
  if(imagen == "DEEP" ){
    return "/assets/images/slumber.png";
  }
  if(imagen == "LIGHT" ){
    return "/assets/images/sleeping.png";
  }
  
  if(imagen == "NONE" ){
    return "/assets/images/hotel-bed.png";
  }
  

}

getImagenTiempo(imagen:string): any {
  if(imagen == "SUNNY"){
    return "/assets/images/dom.png";
  }
  if(imagen == "CLOUDY" ){
    return "/assets/images/nubes.png";
  }
  
  if(imagen == "RAINY" ){
    return "/assets/images/lluvia.png";
  }
  
  if(imagen == "STORMY" ){
    return "/assets/images/tormenta.png";
  }
  
  if(imagen == "SNOWY" ){
    return "/assets/images/nieve.png";
  }
  

}

eliminarEntradaMental(idEntrada: any) {
  this.diarioEmocionalService.deleteEntry(idEntrada).subscribe({
    next: res => {
      console.log(res);
      document.location.href="/app/Tabs/DiarioEmocional"
      window.location.href = "/app/Tabs/DiarioEmocional"
    },error: err => {
      console.log(err)
    }
  })
}

 
}

