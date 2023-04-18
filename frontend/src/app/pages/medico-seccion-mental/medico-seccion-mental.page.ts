import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

  import { LoadingController, NavController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import { DiarioEmocionalService } from 'src/app/services/diario-emocional.service';
 

@Component({
  selector: 'app-medico-seccion-mental',
  templateUrl: './medico-seccion-mental.page.html',
  styleUrls: ['./medico-seccion-mental.page.scss'],
  
})
export class MedicoSeccionMentalPage implements OnInit {
  
  entries:any = [];

 


  constructor(private diarioEmocionalService: DiarioEmocionalService, private loadingCtrl: LoadingController, private analiticasService: AnaliticasService,private route:ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    let id_paciente = this.route.snapshot.paramMap.get('id')
    this.loadEntradasDiarioEmocional(id_paciente);
  }



  goBack(){
    this.navCtrl.pop(); 
  }
    
  
  async loadEntradasDiarioEmocional(id_paciente:any){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      spinner:'bubbles',
    });
  
    await loading.present();
  
    this.diarioEmocionalService.getDiarioEmocionalPaciente(id_paciente).subscribe((res)=> {
      for(var entrada of res){
        let Aux:Date = new Date(entrada.date);
        console.log(Aux)
        var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
        entrada.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();
        this.entries.push(entrada);
        console.log(entrada)
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
    if(imagen == "NORMAL" ){
      return "/assets/images/normal-food.png";
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
    if(imagen == "NORMAL" ){
      return "/assets/images/sleeping.png";
    }
    if(imagen == "LIGHT" ){
      return "/assets/images/light-sleep.png";
    }
    if(imagen == "NONE" ){
      return "/assets/images/insomnia.png";
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
        document.location.href="/app/Tabs/seccion-mental"
        window.location.href = "/app/Tabs/seccion-mental"
      },error: err => {
        console.log(err)
      }
    })



}






}




 


