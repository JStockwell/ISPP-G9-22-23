import { Component, OnInit } from '@angular/core';
import { MedicHomeService } from '../../services/medic-home.service';
import { LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-medic-home',
  templateUrl: './medic-home.page.html',
  styleUrls: ['./medic-home.page.scss'],
})
export class MedicHomePage implements OnInit {

  pacientes: any=[];

  constructor(private HomeMedicService: MedicHomeService,private userService: UsersService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadPacientes();
  }

  async loadPacientes(){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      spinner:'bubbles',
    });
  
    await loading.present();
  
    this.HomeMedicService.getPacientes().subscribe((res)=> {
      for(var entrada of res){
        this.pacientes.push(entrada);

      }
      loading.dismiss();
  
    });
  
  }

  existsPatients = () =>{
    if (this.pacientes){
      return this.pacientes.length>0;
    } else{
      return false;
    }
  }
  cerrarsesion(){
      
    this.userService.logout().subscribe(
      (data) =>{
        localStorage.clear();
        window.location.href=""
      },
      error =>{
        console.log(error)
      }
      );
    } 

}

type patient = {
  name: null,
  surname: null
};
