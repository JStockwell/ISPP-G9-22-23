import { Component, OnInit } from '@angular/core';
import { SeccionFisicaServiceService } from 'src/app/services/seccion-fisica-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-seccion-fisica',
  templateUrl: './seccion-fisica.page.html',
  styleUrls: ['./seccion-fisica.page.scss'],
})
export class SeccionFisicaPage implements OnInit {
  
  entries: any = [];

  constructor(private fisicoService: SeccionFisicaServiceService, private loadingCtrl: LoadingController) { }

//   existsEntradas = () =>{
//     if (this.entradas){
//       return this.entradas.length>0;
//     } else{
//       return false;
//     }
//   }

  eliminarEntradaFisica(idEntrada: any) {
    this.fisicoService.deleteEntry(idEntrada).subscribe({
      next: res => {
        console.log(res);
        document.location.href="/app/Tabs/seccion-fisica"
        window.location.href = "/app/Tabs/seccion-fisica"
      },error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
    this.loadEntradasDiarioFisico();

  }

async loadEntradasDiarioFisico(){

        const loading = await this.loadingCtrl.create({
        message: 'Cargando..',
        spinner:'bubbles',
      });

      await loading.present();

      this.fisicoService.getEntradasFisicas().subscribe((res) =>{
        loading.dismiss();
        this.entries = res; 
        console.log(this.entries)
        console.log("Diario Fisico")

      });

}

existsEntradas = () =>{
  if (this.entries){
    return this.entries.length>0;
  } else{
    return false;
  }
}




}





//     async loadEntradasDiarioFisico(){

//       const loading = await this.loadingCtrl.create({
//         message: 'Cargando..',
//         spinner:'bubbles',
//       });
    
//       await loading.present();

//       this.fisicoService.getEntradasFisicas().subscribe({
//         next: data=>{
//            loading.dismiss();
//           this.entradas = []
//           for(let i=0;i<data.length;i++){
//             let d = data[i] as any;
//             let date_string:Array<any> = d.date.split("-");
//             let date = new Date(date_string[0], date_string[1], date_string[2]);
//             let entrada = new EntradaFisica(date, d.state, d.body_parts, d.notes);
//             this.entradas.push(entrada)
//           }
//           this.entradas.sort((entrada1:EntradaFisica, entrada2:EntradaFisica)=> entrada1.date.getTime() - entrada2.date.getTime())
//           this.entradas.reverse()
//         },
//         error: err=>{
//           console.log(err.error.message);
//         }
//       })


//     }

// }

// export class EntradaFisica{
//   date:Date
//   state:String
//   body_parts:String
//   notes:String

//   constructor(date:Date, state:String, body_parts:String, notes:String){
//     this.date = date;
//     this.state = state;
//     this.body_parts = body_parts;
//     this.notes = notes;
//   }
// }
