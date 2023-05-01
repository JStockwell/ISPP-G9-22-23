import { Component, OnInit } from '@angular/core';
import { SeccionFisicaServiceService } from 'src/app/services/seccion-fisica-service.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-medico-seccion-fisica',
  templateUrl: './medico-seccion-fisica.page.html',
  styleUrls: ['./medico-seccion-fisica.page.scss'],
})
export class MedicoSeccionFisicaPage implements OnInit {

 


  id: any
  entries: any = [];

  constructor(private fisicoService: SeccionFisicaServiceService, private loadingCtrl: LoadingController, private analiticasService: AnaliticasService,private route:ActivatedRoute,private navCtrl: NavController) { }

  eliminarEntradaFisica(idEntrada: any) {
    this.fisicoService.deleteEntry(idEntrada).subscribe({
      next: res => {
        document.location.href="/app/Tabs/seccion-fisica"
        window.location.href = "/app/Tabs/seccion-fisica"
      },error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
    let id_paciente = this.route.snapshot.paramMap.get('id')
    this.loadEntradasDiarioFisico(id_paciente);

  }

async loadEntradasDiarioFisico(id_paciente:any){

        const loading = await this.loadingCtrl.create({
        message: 'Cargando..',
        spinner:'bubbles',
      });

      await loading.present();

      this.fisicoService.getEntradasFisicasPaciente(id_paciente).subscribe((res) =>{
        for(var entrada of res){
          let Aux:Date = new Date(entrada.date);
          var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
          entrada.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();
          this.entries.push(entrada);
        }
        loading.dismiss();
      });

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

existsEntradas = () =>{
  if (this.entries){
    return this.entries.length>0;
  } else{
    return false;
  }
}




}

