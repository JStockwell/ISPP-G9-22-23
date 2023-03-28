import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModificarMentalService} from 'src/app/services/modificar-mental.service'


@Component({
  selector: 'app-modificar-mental',
  templateUrl: './modificar-mental.page.html',
  styleUrls: ['modificar-mental.page.scss'],

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

  constructor(private route:ActivatedRoute, private service:ModificarMentalService) {}

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
      },
      error:err=>{
        console.log(err.error.message);
      }
    })
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
      window.location.href = '/app/Tabs/DiarioEmocional';
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

