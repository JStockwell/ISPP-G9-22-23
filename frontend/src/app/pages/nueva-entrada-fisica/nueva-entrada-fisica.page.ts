import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NuevaEntradaFisicaService } from 'src/app/services/nueva-entrada-fisica.service';

@Component({
  selector: 'app-nueva-entrada-fisica',
  templateUrl: './nueva-entrada-fisica.page.html',
  styleUrls: ['./nueva-entrada-fisica.page.scss'],
})
export class NuevaEntradaFisicaPage implements OnInit {

  estadoFisico:string | undefined
  dolores:string | undefined
  notas:string | undefined
  constructor(private nuevaEntradFisicaService: NuevaEntradaFisicaService) { }

  ngOnInit() {
  }

  nuevaEntrada(){
    let entrada = {
      estadoFisico: this.estadoFisico,
      dolores: this.dolores,
      notas: this.notas
    }

    console.log(entrada)
  }
}
