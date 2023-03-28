import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallesFisicoService } from 'src/app/services/detalles-fisico.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-fisico',
  templateUrl: './detalles-fisico.page.html',
  styleUrls: ['./detalles-fisico.page.scss'],
})
export class DetallesFisicoPage implements OnInit {


  array_bodyParts:any
  entrada!:physicalEntry

  constructor(private service:DetallesFisicoService, private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    this.service.getEntradaFisica(this.route.snapshot.paramMap.get("id")).subscribe({
      next: data =>{
        this.entrada = data
        if(this.entrada.body_parts) {
          this.array_bodyParts = this.entrada.body_parts.split(",")
        }
      },
      error:err=>{
        console.log(err.error.message)
      }
    })
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  bodyPartsNotEmpty = () =>{
    if(this.entrada.body_parts){
      return this.entrada.body_parts.length>0;
    } else {
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

}

type physicalEntry = {
  id: null,
  date: null,
  state: string,
  body_parts: string,
  notes: string,
  patient_id: null,
  done_exercise: null
}
