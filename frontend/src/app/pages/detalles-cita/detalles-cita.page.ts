import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnaliticasService } from 'src/app/services/analiticas.service';
import { DetallesCitaService } from 'src/app/services/detalles-cita.service';
import { NavController } from '@ionic/angular';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-detalles-cita',
  templateUrl: './detalles-cita.page.html',
  styleUrls: ['./detalles-cita.page.scss'],
})
export class DetallesCitaPage implements OnInit {

  entrada: any;
  dtAux: String = "";
  prueba: any;
  idCita = this.route.snapshot.paramMap.get('id');

  constructor(private detallesCitaService: DetallesCitaService, private calendarioService: CalendarioService, private navCtrl: NavController, private route: ActivatedRoute, private analiticasService: AnaliticasService) { }

  ngOnInit() {
    this.encontrarCita();
  }

  replaceSaltosLinea(entry: any): any {
    entry.description = entry.description.replace(/\n/g, '<br>');
  }

  goBack(){
    this.navCtrl.pop(); 
  }
  
  encontrarCita(): void{
    let idCita = this.route.snapshot.paramMap.get("id");
    
    this.detallesCitaService.getCita(idCita).subscribe({
      next: data =>{
        this.entrada = data
        console.log(this.entrada)

        let Aux:Date = new Date(this.entrada.date);
        var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
        this.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();

        let dateAux = data.date;
        this.entrada.date = this.analiticasService.dateFormatter_entradas(dateAux);
      },
      error:err=>{
        console.log(err.error.message);
      }
    });
  }
  
  eliminarCita(idEntrada: any) {
    this.calendarioService.deleteAppointment(idEntrada).subscribe({
      next: res => {
        console.log(res);
        document.location.href="/app/Tabs/calendario"
        window.location.href = "/app/Tabs/calendario"
      },error: err => {
        console.log(err)
      }
    })
  }

}
