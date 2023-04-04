import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import { DetallesCitaService } from 'src/app/services/detalles-cita.service';

@Component({
  selector: 'app-detalles-cita',
  templateUrl: './detalles-cita.page.html',
  styleUrls: ['./detalles-cita.page.scss'],
})
export class DetallesCitaPage implements OnInit {

  entrada!:appointment;
  dtAux:String = ""

  constructor(private detallesCitaService: DetallesCitaService, private navCtrl: NavController, private route: ActivatedRoute, private analiticasService: AnaliticasService) { }

  ngOnInit() {
    this.detallesCitaService.getAppointment(this.route.snapshot.paramMap.get("id")).subscribe({
      next: data =>{
        this.entrada = data
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

  replaceSaltosLinea(entry: appointment): any {
    entry.description = entry.description.replace(/\n/g, '<br>');
  }

  goBack(){
    this.navCtrl.pop(); 
  }

}

type appointment = {
  id: null,
  date: string,
  description: string,
  specialty: string,
  time: string,
  patient_id:null
}

