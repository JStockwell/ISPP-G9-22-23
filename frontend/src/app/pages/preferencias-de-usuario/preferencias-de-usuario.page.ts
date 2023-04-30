import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-preferencias-de-usuario',
  templateUrl: './preferencias-de-usuario.page.html',
  styleUrls: ['./preferencias-de-usuario.page.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
})
export class PreferenciasDeUsuarioPage implements OnInit {

  id : number | any= 0;
  birthdate: string| any= '';
  has_period: boolean| any = false;
  code: string| any= '';
  premium_account: boolean | any = false;
  share_appointments:boolean | any = false; 
  tel: string | any = '';
  share_physical_entries:boolean | any =false;
  share_mental_entries: boolean | any =false;
  share_metrics:boolean | any =false;;

  constructor(private route:ActivatedRoute, private navCtrl: NavController, private uService : UsersService) { }

  ngOnInit() {
    let usuario = this.uService.UserData().subscribe((res)=>{
      console.log(res);
      this.share_mental_entries = res.share_mental_entries;
      this.share_metrics= res.share_metrics;
      this.share_physical_entries = res.share_physical_entries;
      this.birthdate= res.birthdate;
      this.has_period=res.has_period;
      this.code= res.code; 
      this.premium_account= res.premium_account;
      this.share_appointments= res.share_appointments;
      this.tel= res.tel;
      this.id=res.id;


    });
    
  }

  editarPreferenciasUsuario():void{
    let dataEntry: any; 

    dataEntry = {
      id:this.id,
      birthdate: this.birthdate,
      tel: this.tel,
      has_period: this.has_period,
      premium_account: this.premium_account,
      share_appointments: this.share_appointments,
      share_mental_entries: this.share_mental_entries,
      share_metrics: this.share_metrics,
      share_physical_entries: this.share_physical_entries,
      code: this.code,
      user: this.getIdUser(),

    };

    this.uService.modifyPreferencias(this.id,dataEntry).subscribe({
      next:data=>{
        window.location.href = '/app/Tabs/Analytics';
      },
      error:err=>{
        console.log(err.error.message);
      }
    })
    console.log(dataEntry);

  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
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

  goBack(){
    this.navCtrl.pop(); 
  }

}
