import { Component, OnInit } from '@angular/core';
import { SeccionFisicaServiceService } from 'src/app/services/seccion-fisica-service.service';
import { LoadingController } from '@ionic/angular';
import { AnaliticasService } from 'src/app/services/analiticas.service';

@Component({
  selector: 'app-seccion-fisica',
  templateUrl: './seccion-fisica.page.html',
  styleUrls: ['./seccion-fisica.page.scss'],
})
export class SeccionFisicaPage implements OnInit {
  
  id: any
  entries: any = [];

  constructor(private fisicoService: SeccionFisicaServiceService, private loadingCtrl: LoadingController, private analiticasService: AnaliticasService) { }

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
        for(var entrada of res){
          let Aux:Date = new Date(entrada.date);
          console.log(Aux)
          var aux2 = Aux.toLocaleDateString("es-ES", { weekday: 'long'})
          entrada.dtAux = aux2.charAt(0).toUpperCase() + aux2.substring(1) + ', ' + Aux.toLocaleDateString();
          this.entries.push(entrada);
        }
        loading.dismiss();
      });

}

splitParts(str: string) {
  let arr = str.split(',');
  return arr
}

getImagenEstado(imagen:string): any {
  if(imagen == "VG" ){
    return "/assets/images/cara-muy-feliz.png";
  }
  if(imagen == "G" ){
    return "/assets/images/cara-feliz.png";
  }
  if(imagen == "F" ){
    return "/assets/images/cara-neutral.png";
  }
  if(imagen == "B" ){
    return "/assets/images/cara-triste.png";
  }
  if(imagen == "VB" ){
    return "/assets/images/cara-muy-triste.png";
  }
}

getImagenDolor(imagen:string): any {
  if(imagen == "HEAD" ){
    return "/assets/images/HEAD.png";
  }
  if(imagen == "NECK" ){
    return "/assets/images/NECK.png";
  }
  if(imagen == "SHOULDER" ){
    return "/assets/images/SHOULDER.png";
  }
  if(imagen == "HIGHER_BACK" ){
    return "/assets/images/HIGHER_BACK.png";
  }
  if(imagen == "LOWER_BACK" ){
    return "/assets/images/LOWER_BACK.png";
  }
  if(imagen == "TORSO" ){
    return "/assets/images/TORSO.png";
  }
  if(imagen == "ARM" ){
    return "/assets/images/ARM.png";
  }
  if(imagen == "ELBOW" ){
    return "/assets/images/ELBOW.png";
  }
  if(imagen == "WRIST" ){
    return "/assets/images/WRIST.png";
  }
  if(imagen == "HAND" ){
    return "/assets/images/HAND.png";
  }
  if(imagen == "LEG" ){
    return "/assets/images/LEG.png";
  }
  if(imagen == "KNEE" ){
    return "/assets/images/KNEE.png";
  }
  if(imagen == "ANKLE" ){
    return "/assets/images/ANKLE.png";
  }
  if(imagen == "FOOT" ){
    return "/assets/images/FOOT.png";
  }
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
