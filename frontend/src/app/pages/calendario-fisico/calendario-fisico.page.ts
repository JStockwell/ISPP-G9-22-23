import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { CalendarioService } from 'src/app/services/calendario.service';
import { SeccionFisicaServiceService } from 'src/app/services/seccion-fisica-service.service';

@Component({
  selector: 'app-calendario-fisico',
  templateUrl: './calendario-fisico.page.html',
  styleUrls: ['./calendario-fisico.page.scss'],
})
export class CalendarioFisicoPage implements OnInit {

  entradas: any = [];
  entrada: any|undefined;
  fechaSeleccionada = new Date().toISOString();

  constructor(private navCtrl:NavController, private fisicoService:SeccionFisicaServiceService, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.loadEntradasDiarioFisico();
  }

  onDateChange(event: any) {
    this.fechaSeleccionada = event.detail.value.split('T')[0];
  }

  async loadEntradasDiarioFisico(){

    const loading = await this.loadingCtrl.create({
    message: 'Cargando..',
    spinner:'bubbles',
  });

  await loading.present();

  this.fisicoService.getEntradasFisicas().subscribe((res) =>{
    for(var entrada of res){
      let Aux:Date = new Date(entrada.date);
      console.log(Aux)
      var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
      entrada.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();
      this.entradas.push(entrada);
    }
    loading.dismiss();
    });

  }

  fechaEnEntradas():boolean{
    let sel = this.fechaSeleccionada.split('T')
    for(let entrada of this.entradas){
      let date = new Date(entrada.date).toISOString().split('T');
      if(date[0]===sel[0]){
        this.entrada=entrada;
        return true;
      }
    }
    return false;
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  splitParts(str: string) {
    let arr = str.split(',');
    return arr
  }
  
  getImagenEstado(imagen:string): any {
    if(imagen == "VG" ){
      return "/assets/images/cara-muy-feliz.png";
    }
    if(imagen == "G" ){
      return "/assets/images/cara-feliz.png";
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

  getImagenDolor(imagen:string): any {
    if(imagen == "HEAD" ){
      return "/assets/images/HEAD.png";
    }
    if(imagen == "NECK" ){
      return "/assets/images/NECK.png";
    }
    if(imagen == "SHOULDER" ){
      return "/assets/images/SHOULDER.png";
    }
    if(imagen == "HIGHER_BACK" ){
      return "/assets/images/HIGHER_BACK.png";
    }
    if(imagen == "LOWER_BACK" ){
      return "/assets/images/LOWER_BACK.png";
    }
    if(imagen == "TORSO" ){
      return "/assets/images/TORSO.png";
    }
    if(imagen == "ARM" ){
      return "/assets/images/ARM.png";
    }
    if(imagen == "ELBOW" ){
      return "/assets/images/ELBOW.png";
    }
    if(imagen == "WRIST" ){
      return "/assets/images/WRIST.png";
    }
    if(imagen == "HAND" ){
      return "/assets/images/HAND.png";
    }
    if(imagen == "LEG" ){
      return "/assets/images/LEG.png";
    }
    if(imagen == "KNEE" ){
      return "/assets/images/KNEE.png";
    }
    if(imagen == "ANKLE" ){
      return "/assets/images/ANKLE.png";
    }
    if(imagen == "FOOT" ){
      return "/assets/images/FOOT.png";
    }
  }
}