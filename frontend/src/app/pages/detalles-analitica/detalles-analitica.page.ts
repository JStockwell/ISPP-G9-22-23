import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
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

  analiticas = [
    {
      id: 1,
      name: "azucar",
      unit: "g/L",
      min_value: "56",
      max_value: "80",
    },
    {
      id: 2,
      name: "colesterol",
      unit: "g/L",
      min_value: "70",
      max_value: "92",
    },
  ];

  mediciones = [
    {
      id: 1,
      date: "16:34 Jueves, 23/03/2023",
      value: "57",
      metric: 1,
    },
    {
      id: 2,
      date: "17:00 Lunes, 27/03/2023",
      value: "55",
      metric: 1,
    },
    {
      id: 3,
      date: "16:34 Jueves, 28/03/2023",
      value: "56",
      metric: 1,
    },
    {
      id: 4,
      date: "17:00 Viernes, 29/03/2023",
      value: "70",
      metric: 1,
    },
    {
      id: 5,
      date: "16:34 Jueves, 30/03/2023",
      value: "60",
      metric: 1,
    },
    {
      id: 6,
      date: "17:00 Lunes, 31/03/2023",
      value: "56",
      metric: 1,
    },
    {
      id: 7,
      date: "16:34 Jueves, 01/04/2023",
      value: "58",
      metric: 1,
    },
    {
      id: 8,
      date: "17:00 Lunes, 03/04/2023",
      value: "60",
      metric: 1,
    },
    {
      id: 8,
      date: "16:34 Jueves, 05/04/2023",
      value: "57",
      metric: 1,
    },
    {
      id: 9,
      date: "17:00 Lunes, 06/04/2023",
      value: "55",
      metric: 1,
    },

    {
      id: 10,
      date: "16:34 Jueves, 07/04/2023",
      value: "50",
      metric: 1,
    },
    {
      id: 11,
      date: '18:47 Lunes, 27/03/2023',
      value: '79',
      metric: 2,
    },
    {
      id: 12,
      date: '18:47 Lunes, 28/03/2023',
      value: '60',
      metric: 2,
    },
    {
      id: 13,
      date: '18:47 Lunes, 29/03/2023',
      value: '89',
      metric: 2,
    },
    {
      id: 14,
      date: '18:47 Lunes, 30/03/2023',
      value: '74',
      metric: 2,
    },
    {
      id: 15,
      date: '18:47 Lunes, 31/03/2023',
      value: '70',
      metric: 2,
    },
    {
      id: 16,
      date: '18:47 Lunes, 01/04/2023',
      value: '75',
      metric: 2,
    },
  ];
  analitica = this.analiticas[0];
  constructor(private route: ActivatedRoute, private navCtrl: NavController, public router: Router, private analiticaService:AnaliticasService) {}

  ngOnInit() {

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
    this.analitica = this.analiticas[id-1];  
    this.createChart(id);
    
    let defaultTab = document.getElementById("default");
    defaultTab?.click();
  }

  createChart(id: any) {

    //console.log('creando')

    const dates: String[] = [];
    const values: String[] = [];
    for (const medicion of this.mediciones) {
      if (medicion.metric == id) {
        const aux = medicion.date.split(" ");
        dates.push(aux[2]);
        values.push(medicion.value);
      }
    }
    Chart.defaults.color = "black";
    Chart.defaults.backgroundColor = "#f4f5f9";

    const mensaje: string =
      "Resultados de la analítica(" + this.analiticas[id-1].unit + ")";
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


