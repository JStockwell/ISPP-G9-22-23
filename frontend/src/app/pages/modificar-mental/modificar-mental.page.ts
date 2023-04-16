import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModificarMentalService} from 'src/app/services/modificar-mental.service'
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-modificar-mental',
  templateUrl: './modificar-mental.page.html',
  styleUrls: ['modificar-mental.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})

export class ModificarMentalPage implements OnInit{

  entrada!: EntradaMental
  estadoFisico:string | any='';
  suenyo:string | any='';
  notas:string | any='';
  comida:string | any='';
  tiempo:string | any='';
  ppositivos:string | any='';
  pnegativos:string | any='';
  today : string | any ='';
  dtAux : String = "";

  constructor(private route:ActivatedRoute, private service:ModificarMentalService,private navCtrl: NavController) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.service.getEntradasMental(id).subscribe({
      next:data=>{
        this.entrada = data as EntradaMental;
        this.estadoFisico = this.entrada.state;
        this.suenyo = this.entrada.sleep;
        this.notas = this.entrada.notes;
        this.comida = this.entrada.food
        this.tiempo = this.entrada.weather
        this.ppositivos = this.entrada.positive_thoughts
        this.pnegativos = this.entrada.negative_thoughts
        this.today = this.entrada.date;
        let Aux:Date = new Date(this.today);
        var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
        this.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();
      },
      error:err=>{
        console.log(err.error.message);
      }
    })
  }

  goBack(){
    this.navCtrl.pop(); 
  }
 editarEntradaMental():void{

  let dataEntry: any;

  dataEntry = {
    id: this.route.snapshot.paramMap.get('id'),
    date: this.today,
    state: this.estadoFisico,
    sleep: this.suenyo,
    food: this.comida,
    weather: this.tiempo,
    patient_id: this.service.getIdUser(),

  };

  if(this.notas !=""){
    dataEntry["notes"]= this.notas;
  }

  if(this.ppositivos !=""){
    dataEntry["positive_thoughts"]= this.ppositivos;
  }

  if(this.pnegativos !=""){
    dataEntry["negative_thoughts"]= this.pnegativos;
  }

  this.service.modifyEntradasMental(this.route.snapshot.paramMap.get('id'),dataEntry).subscribe({
    next:data=>{
      window.location.href = '/app/Tabs/seccion-mental';
    },
    error:err=>{
      console.log(err.error.message);
    }
  })

  console.log(dataEntry);
}

}


type EntradaMental = {
  id: any,
  date: string,
  state: string,
  sleep: string,
  food: string,
  weather: string
  notes: string,
  positive_thoughts: string,
  negative_thoughts: string,
  patient_id: null,

}

