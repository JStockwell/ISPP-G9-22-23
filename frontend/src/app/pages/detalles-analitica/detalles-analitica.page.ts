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

  @ViewChild("barChart") barChart: any;
  bars: any;
  colorArray: any;

  analitica:analitica = {
    id: null,
    info: {
      name: null,
      unit: null
    },
    min_value: null,
    max_value: null
  };

  mediciones = new Array<measure>;
  constructor(private route: ActivatedRoute, private navCtrl: NavController, public router: Router, private service:DetalleAnaliticasService, private analiticaService:AnaliticasService) {}

  ngOnInit() {
    this.service.getDetallesAnaliticas(this.route.snapshot.paramMap.get("id")).subscribe({
      next: data=>{
        this.analitica=data
      },
      error:err=>{
        console.log(err.error.message)
      }
    })

    this.analiticaService.getAnaliticaDetails().subscribe({
      next: data =>{
        this.mediciones = data;
      },
      error:err=>{
        console.log(err.error.message)
      }
    })

    let defaultTab = document.getElementById("default");
    defaultTab?.click();
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

  ionViewDidEnter() {
    let id = this.route.snapshot.params["id"];
    //console.log(id)
    this.createChart(id);
  }

  createChart(id: any) {

    //console.log('creando')

    const dates: String[] = [];
    const values: String[] = [];
    for (const medicion of this.mediciones) {
      if (medicion.metric.id == id) {
        dates.push(medicion.date);
        values.push(medicion.value);
      }
    }
    Chart.defaults.color = "black";
    Chart.defaults.backgroundColor = "#f4f5f9";

    const mensaje: string =
      "Resultados de la analítica(" + this.analitica.info.unit + ")";
    this.bars = new Chart(this.barChart.nativeElement, {
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
        ],
      },
    });
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


