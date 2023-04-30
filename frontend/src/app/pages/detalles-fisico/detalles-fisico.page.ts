import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallesFisicoService } from 'src/app/services/detalles-fisico.service';
import { AlertController, NavController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import { SeccionFisicaServiceService } from 'src/app/services/seccion-fisica-service.service';


@Component({
  selector: 'app-detalles-fisico',
  templateUrl: './detalles-fisico.page.html',
  styleUrls: ['./detalles-fisico.page.scss'],
})
export class DetallesFisicoPage implements OnInit {


  array_bodyParts:any
  entrada!:physicalEntry
  dtAux:String = ""

  constructor(private service:DetallesFisicoService, private route: ActivatedRoute, private navCtrl: NavController, private analiticasService: AnaliticasService, private alertController:AlertController, private fisicoService:SeccionFisicaServiceService) {}

  ngOnInit() {
    this.service.getEntradaFisica(this.route.snapshot.paramMap.get("id")).subscribe({
      next: data =>{
        this.entrada = data
        if(this.entrada.body_parts) {
          this.array_bodyParts = this.entrada.body_parts.split(",")
        }

        let Aux:Date = new Date(this.entrada.date);
        var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
        this.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();

        let dateAux = data.date;
        this.entrada.date = this.analiticasService.dateFormatter_entradas(dateAux);
      },
      error:err=>{
        console.log(err.error.message)
      }
    })
  }

  getId(){
    return this.route.snapshot.paramMap.get("id");
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  async eliminarEntradaFisica(idEntrada: any) {
    const alert = await this.alertController.create({
      header:'Confirme',
      message:'¿Está seguro de que quiere borrar esta entrada en el diario físico?',
      buttons:[{
        text:'Sí',
        role:'yes',
        handler: ()=>{
          this.fisicoService.deleteEntry(idEntrada).subscribe({
            next: res => {
              console.log(res);
              document.location.href="/app/Tabs/seccion-fisica"
              window.location.href = "/app/Tabs/seccion-fisica"
            },error: err => {
              console.log(err)
            }
          })
        }
      }, {
        text:'No',
        role:'no',
        handler: ()=>{
          return null;
        }
      }]
    })

    await alert.present();
  }

  bodyPartsNotEmpty = () =>{
    if(this.entrada.body_parts){
      return this.entrada.body_parts.length>0;
    } else {
      return false;
    }
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

type physicalEntry = {
  id: null,
  date: string,
  state: string,
  body_parts: string,
  notes: string,
  period_now: boolean,
  patient_id: null,
  done_exercise: null
}
