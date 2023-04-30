import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { type } from 'os';
import { MedicHomeService } from 'src/app/services/medic-home.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {

  pacientes: any=[];
  share_physical_entries:boolean | any =false;
  share_mental_entries: boolean | any =false;
  share_metrics:boolean | any =false;;

  constructor(private route:ActivatedRoute,private navCtrl: NavController,private loadingCtrl: LoadingController,private HomeMedicService: MedicHomeService) { }


  ngOnInit() {
    let id_paciente = this.route.snapshot.paramMap.get('id')
    this.loadPaciente(id_paciente);

  }

  goBack(){
    this.navCtrl.pop(); 
  }

  permiteDiarioFisico (){
    let resultado= false;
    if(this.share_physical_entries){
      resultado = true
    }
    return resultado;
  }
  permiteDiarioMental (){
    let resultado= false;
    if(this.share_mental_entries){
      resultado = true
    }
    return resultado;
  }
  permiteAnaliticas (){
    let resultado= false;
    if(this.share_metrics){
      resultado = true
    }
    return resultado;
  }

  async loadPaciente(id_paciente:any){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      spinner:'bubbles',
    });
  
    await loading.present();
  
    this.HomeMedicService.getPaciente(id_paciente).subscribe((res)=> {

        this.share_physical_entries= res.share_physical_entries;
        this.share_mental_entries= res.share_mental_entries;
        this.share_metrics= res.share_metrics;;
      console.log(res)
      
      loading.dismiss();
  
    });
  
  }



}
type patient = {
  name: null,
  surname: null
};
