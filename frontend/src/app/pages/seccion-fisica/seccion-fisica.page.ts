import { Component, OnInit } from '@angular/core';
import { SeccionFisicaServiceService } from 'src/app/services/seccion-fisica-service.service';

@Component({
  selector: 'app-seccion-fisica',
  templateUrl: './seccion-fisica.page.html',
  styleUrls: ['./seccion-fisica.page.scss'],
})
export class SeccionFisicaPage implements OnInit {
  entradas!:Array<any>
  constructor(private fisicoService: SeccionFisicaServiceService) { }

  existsEntradas = () =>{
    if (this.entradas){
      return this.entradas.length>0;
    } else{
      return false;
    }
  }

  eliminarEntradaFisica(idEntrada: any) {
    this.fisicoService.deleteEntry(idEntrada).subscribe({
      next: res => {
        console.log(res);
        document.location.href="http://localhost:8100/app/Tabs/seccion-fisica"
        window.location.href = "http://localhost:8100/app/Tabs/seccion-fisica"
      },error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
    this.fisicoService.getEntradasFisicas().subscribe({
      next: data=>{
        this.entradas = data
        console.log(this.entradas)
      },
      error: err=>{
        console.log(err.error.message);
      }
    })
  }

}
