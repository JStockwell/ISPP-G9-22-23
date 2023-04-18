import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModificarPerfilService } from 'src/app/services/modificar-perfil.service';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-modificar-perfil',
    templateUrl: './modificar-perfil.page.html',
    styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
    entrada !: EntradaPerfil
    birthdate: string| any= '';
    tel: string | any = '';
    username: string | any='';
    email: string | any='';
    name: string | any='';
    surname: string | any='';

    constructor(private route:ActivatedRoute, private userService: UsersService, private service: ModificarPerfilService, private navCtrl: NavController) {}

    ngOnInit(): void {
        let id = this.getUserId();
        let usuario = this.service.getEntradaUser(id).subscribe({
            next:data=>{
                console.log("res infouser, ", data);
                this.entrada = data as EntradaPerfil;
                this.birthdate=this.entrada.birthdate;
                this.tel= this.entrada.tel;
                this.username=this.entrada.user.username;
                this.email=this.entrada.user.email;
                this.name=this.entrada.user.first_name;
                this.surname=this.entrada.user.last_name;
            }
          });
    }

    goBack(){
        this.navCtrl.pop(); 
    }

    getUserId(){
        if(this.userService.isLoggedIn()){
            var ck = localStorage.getItem('auth-user')
            if(ck != null) {
                    var tk = JSON.parse(ck);
                    var res = [];
                    for(var i in tk) {
                        res.push(tk[i]);
                    }
                    return res[1];
            }
        }
    }

    editarPerfil():void{
        console.log("entramos metodo");
        let dataEntry: any;
        let usuario = this.service.getEntradaUser(this.getUserId());
      
        dataEntry = {
            first_name: this.name,
            last_name: this.surname,
            tel: this.tel,
            birthdate: this.birthdate,
            /*premium_account: ,
            share_physical_entries: ,
            share_mental_entries: ,
            share_metrics: ,
            share_appointments: ,
            has_period: ,*/
            email: this.email,
            username: this.username,
            id: this.getUserId(),
            /*birthdate: this.birthdate,
            tel: this.tel,*/
           /* user: {
                username: this.username,
                email: this.email,
                first_name: this.name,
                last_name: this.surname,
            }*/
        };
      
        this.service.modifyDatosPerfil(this.getUserId(),dataEntry).subscribe({
            next:data=>{
                window.location.href = '/app/Tabs/perfil';
            },
            error:err=>{
                console.log(err.error.message);
            }
        })
      
        console.log(dataEntry);
    }
      
}


type EntradaPerfil = {
    id : any;
    birthdate: string;
    tel: string;
    user : {
        username: string;
        first_name: string;
        last_name: string;
        email: string;
    }
  }