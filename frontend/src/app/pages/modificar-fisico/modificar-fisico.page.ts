import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModificarFisicoService } from 'src/app/services/modificar-fisico.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-modificar-fisico',
  templateUrl: './modificar-fisico.page.html',
  styleUrls: ['./modificar-fisico.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class ModificarFisicoPage implements OnInit {

  entrada!:EntradaFisica
  estadoFisico:string | any = '';
  dolores:string | any = '';
  deporte:boolean | any = false;
  notas:string | any = '';
  today:string | any = '';
  dtAux:String = ""

  constructor(private route:ActivatedRoute, private service:ModificarFisicoService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.service.getEntradasFisica(id).subscribe({
      next:data=>{
        this.entrada = data as EntradaFisica;
        this.estadoFisico = this.entrada.state;
        this.dolores = this.entrada.body_parts.split(',');
        this.deporte = this.entrada.done_exercise;
        this.notas = this.entrada.notes;
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

  painsToString(dolores: any) {
    const json = JSON.stringify(dolores);
    const string: string[] = JSON.parse(json);
    if(string.length>1){
      const result = string.join(',');
      return result;
    }
    return string[0];
  }

  editarEntradaFisica(): void{
    let parts = ''
    if (this.dolores) {
      parts = this.painsToString(this.dolores);
    }
    let dataEntry:any;
    if(parts == ''){
        dataEntry = {
        id: this.route.snapshot.paramMap.get('id'),
        date: this.today,
        state: this.estadoFisico,
        body_parts: " ",
        done_exercise: this.deporte,
        patient_id: this.service.getIdUser(),
      };
    }else{
      dataEntry = {
        id: this.route.snapshot.paramMap.get('id'),
        date: this.today,
        state: this.estadoFisico,
        body_parts: parts,
        done_exercise: this.deporte,
        patient_id: this.service.getIdUser(),
      };
    }
    if(this.notas != ""){
      dataEntry["notes"]=this.notas;
    }
    this.service.modifyEntradasFisica(this.route.snapshot.paramMap.get('id'),dataEntry).subscribe({
      next:data=>{
        window.location.href = '/app/Tabs/seccion-fisica';
      },
      error:err=>{
        console.log(err.error.message);
      }
    })
    
    console.log(dataEntry);
  }

}

type EntradaFisica = {
  id: any,
  date: string,
  state: string,
  body_parts: string,
  notes: string,
  patient_id: null,
  done_exercise: boolean
}
