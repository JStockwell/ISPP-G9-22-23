import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import { DetallesMentalService } from 'src/app/services/detalles-mental.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-mental',
  templateUrl: './detalles-mental.page.html',
  styleUrls: ['./detalles-mental.page.scss'],
})
export class DetallesMentalPage implements OnInit {

  entrada!:mentalEntry
  dtAux:String = ""

  constructor(private service:DetallesMentalService, private route: ActivatedRoute, private analiticasService: AnaliticasService,private navCtrl: NavController) { }

  ngOnInit() {
    this.service.getEntradaMental(this.route.snapshot.paramMap.get("id")).subscribe({
      next: data =>{

        this.entrada = data;
        this.replaceSaltosLinea(this.entrada);

      },
      error:err=>{
        console.log(err.error.message)
      }
    })
  }

  replaceSaltosLinea(entry: mentalEntry): any {
    entry.positive_thoughts = entry.positive_thoughts.replace(/\n/g, '<br>');
    entry.negative_thoughts = entry.negative_thoughts.replace(/\n/g, '<br>');
    entry.notes = entry.notes.replace(/\n/g, '<br>');
  }

  goBack(){
    this.navCtrl.pop(); 
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

}

type mentalEntry = {
  id: null,
  date: string,
  state: string,
  notes: string,
  weather: string,
  food: string,
  sleep:string,
  positive_thoughts:string,
  negative_thoughts:string,
  patient_id:null
}
