import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DetalleAnaliticasService } from 'src/app/services/detalle-analiticas.service';
import { AnaliticasService } from 'src/app/services/analiticas.service';

@Component({
  selector: "app-detalles-analitica",
  templateUrl: "./detalles-analitica.page.html",
  styleUrls: ["./detalles-analitica.page.scss"],
})
export class DetallesAnaliticaPage implements OnInit {
  nombreAnalitica?: String;

  chart: any;

  analitica:analitica = {
    id: null,
    info: {
      name: null,
      unit: null
    },
    min_value: null,
    max_value: null
  };
  id:any;
  mediciones = new Array<measure>;
  medicionesAux = new Array<measure>;
  constructor(private route: ActivatedRoute, private navCtrl: NavController, public router: Router, private service:DetalleAnaliticasService, private analiticaService:AnaliticasService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.service.getDetallesAnaliticas(this.route.snapshot.paramMap.get("id")).subscribe({
      next: data=>{
        this.analitica=data;
        this.createDetails();
      },
      error:err=>{
        console.log(err.error.message)
      }
    })
    let defaultTab = document.getElementById("default");
    defaultTab?.click();
  }

  createDetails(){
    this.analiticaService.getAnaliticaDetails().subscribe({
      next: data =>{
        for(var metric of data){
          let date:Date = metric.date;
          metric.date = this.analiticaService.dateFormatter(date)
          this.mediciones.push(metric)
        }
      },
      error:err=>{
        console.log(err.error.message)
      }
    })

    

    this.analiticaService.getLatestDetails(this.id).subscribe({
      next: data => {
        const data2 = data.reverse();
        for(var metric of data2){
          let date: Date = metric.date;
          const aux = date.toString().substring(0,10);

          metric.date = aux
          
          this.medicionesAux.push(metric)
        }
        let id = this.route.snapshot.params["id"];
        this.createChart(id);
      },
      error:err => {
        console.log(err.error.message)
      }
    })
  }

  goBack(){
    this.navCtrl.pop(); 
  }
  
  changeTab = (event: Event, nombreTab: string) => {
    let contents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < contents.length; i++) {
      let content = contents[i] as HTMLElement;
      content.style.display = "None";
    }

    let tablinks = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = "tab-button";
    }

    let element = document.getElementById(nombreTab) as HTMLElement;
    element.style.display = "block";
    let target = event.currentTarget as HTMLElement;
    target.className += " active";
  };


  createChart(id: any) {

    const dates: String[] = [];
    const values: String[] = [];
    let str = "chr"+id;
    let aux = <HTMLCanvasElement> document.getElementById(str);
    const ctx = aux.getContext("2d");
    if(ctx != null){
      const dataLower: any[] = [];
      const dataUpper: any[] = [];
      for (const medicion of this.medicionesAux) {
        if (medicion.metric.id == id) {
          let date:Date = medicion.date;
          const aux = date.toString().substring(0,10);
          dates.push(aux);
          values.push(medicion.value);
          dataLower.push(medicion.metric.min_value);
          dataUpper.push(medicion.metric.max_value);
        }
      }
      if(dataLower.length==0 || dataUpper.length==0){
        dataLower.push(this.analitica.min_value);
        dataLower.push(this.analitica.min_value);
        dataUpper.push(this.analitica.max_value);
        dataUpper.push(this.analitica.max_value);
        dates.push('')
        dates.push('')
      }
      else if(dataLower.length<=1 || dataUpper.length<=1){
        dataLower.push(this.analitica.min_value);

        dataUpper.push(this.analitica.max_value);

        dates.push('')
      }
      Chart.defaults.color = "black";
      Chart.defaults.backgroundColor = "#f4f5f9";
  
      const mensaje: string =
        "Resultados de la analítica(" + this.analitica.info.unit + ")";
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: mensaje,
              data: values,
              backgroundColor: "light", // array should have same number of elements as number of dataset
              borderColor: "light", // array should have same number of elements as number of dataset
  
              borderWidth: 1,
            },
            {
              label: "Umbrales",
              data: dataLower,
              borderColor: "darkorange",
              backgroundColor:"darkorange",
              pointRadius: 0
            },
            {
              label:"",
              data: dataUpper,
              borderColor: "darkorange",
              backgroundColor:"darkorange",
              pointRadius: 0
            }
          ],
        },
        options:{
          responsive:true,
          maintainAspectRatio:false
        }
      });
    }
  }
  eliminarDetalles(idEntrada: any) {
    this.analiticaService.deleteEntry(idEntrada).subscribe({
      next: res => {
        document.location.href="/app/Tabs/Analytics/Details/"+ this.route.snapshot.paramMap.get('id')
        window.location.href = "/app/Tabs/Analytics/Details/"+ this.route.snapshot.paramMap.get('id')
      },error: err => {
        console.log(err)
      }
    })
  }

}

type analitica = {
  id: null,
  info:{
    name: null,
    unit: null,
  },
  min_value: null,
  max_value: null,
};
type measure = {
  id: null,
  date: any,
  metric:{
    id: null,
    min_value:null,
    max_value:null,
    info:{
      name:null,
      unit:null
    }
    patient_id:null
  },
  patient_id:null,
  value:any
};


