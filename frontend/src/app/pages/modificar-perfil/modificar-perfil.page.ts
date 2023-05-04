import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModificarPerfilService } from 'src/app/services/modificar-perfil.service';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-modificar-perfil',
    templateUrl: './modificar-perfil.page.html',
    styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
    form:any={
        birthdate: null,
        tel: null, 
        username: null,
        email: null,
        first_name: null,
        last_name: null
    }
    entrada!: EntradaPerfil;
    isSuccessful = false;
    errorMessage = '';

   /* entrada !: EntradaPerfil
    birthdate: string| any= '';
    tel: string | any = '';
    username: string | any='';
    email: string | any='';
    name: string | any='';º
    surname: string | any='';*/

    constructor(private route:ActivatedRoute, private userService: UsersService, private modificarPerfilService: ModificarPerfilService, private navCtrl: NavController, private http: HttpClient) {}

    ngOnInit(): void {
        let id = this.getUserId();
        this.modificarPerfilService.getEntradaUser(id).subscribe({
            next:data=>{
                console.log("res infouser, ", data);
                this.entrada = data as EntradaPerfil;
                this.form.tel= this.entrada.tel;
                //console.log("tel, ", this.form.tel);
                this.form.username=this.entrada.user.username;
                //console.log("username, ", this.form.username);
                this.form.email=this.entrada.user.email;
                this.form.birthdate=this.entrada.birthdate;
                console.log("cumpleaños, ", this.form.birthday);
                this.form.first_name=this.entrada.user.first_name;
                console.log("nombre, ", this.form.first_name)
                this.form.last_name=this.entrada.user.last_name;
            },
            error:err=>{
                console.log(err.error.message);
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
       // let dataEntry: any;
        //let usuario = this.modificarPerfilService.getEntradaUser(this.getUserId());
      
        let dataEntry = {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            tel: this.form.tel,
            birthdate: this.form.birthdate,
            /*premium_account: ,
            share_physical_entries: ,
            share_mental_entries: ,
            share_metrics: ,
            share_appointments: ,
            has_period: ,*/
            email: this.form.email,
            username: this.form.username,
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
      
        this.modificarPerfilService.modifyDatosPerfil(this.getUserId(),dataEntry).subscribe({
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