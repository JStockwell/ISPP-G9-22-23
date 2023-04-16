import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NuevoPacienteMedicoService } from 'src/app/services/nuevo-paciente-medico.service';

import { UsersService } from '../../services/users.service';
import { MedicsService } from '../../services/medics.service';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":" Token 481d943276a0f7ce3966f137c256587fdbd166a5"})
};

@Component({
  selector: 'app-nuevo-paciente-medico',
  templateUrl: './nuevo-paciente-medico.page.html',
  styleUrls: ['./nuevo-paciente-medico.page.scss'],
})
export class NuevoPacienteMedicoPage implements OnInit {
  
  
  code:string | undefined
  pk_medic:string | undefined
  
  constructor(private NuevoPacienteMedicoService: NuevoPacienteMedicoService, private navCtrl: NavController, private uService: UsersService, private mService: MedicsService) { }

  ngOnInit() {
    
  }

  goBack(){
    this.navCtrl.back(); 
  }

  enlazarPaciente() : void{
    let dataEntry = {
        code : this.code,
        pk_medic : this.getIdUser(),
    }
    console.log(dataEntry)

    this.NuevoPacienteMedicoService.postPatient(dataEntry).subscribe({
        next: dataEntry => {
          console.log(dataEntry);
          document.location.href="/medic/home"
          window.location.href = "/medic/home"
        },
        error: err => {
          
         console.log(err);
            
        }
      })
  }

  getIdUser(){
    if(this.mService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        return res[1];
      }
    }
  }

 






    
    

}
