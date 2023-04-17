import { Component, OnInit } from '@angular/core';
import { ModificarPerfilService } from 'src/app/services/modificar-perfil.service';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-modificar-perfil',
    templateUrl: './modificar-perfil.page.html',
    styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
    birthdate: string| any= '';
    tel: string | any = '';
    username: string | any='';
    email: string | any='';
    name: string | any='';
    surname: string | any='';

    constructor(private userService: UsersService, private service: ModificarPerfilService, private navCtrl: NavController) {}

    ngOnInit(): void {
        let usuario = this.userService.UserData().subscribe((res)=>{
            console.log("res infouser, ", res);
            this.birthdate=res.birthdate;
            this.tel= res.tel;
            this.username=res.user.username;
            this.email=res.user.email;
            this.name=res.user.first_name;
            this.surname=res.user.last_name;

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

        let dataEntry: any;
      
        dataEntry = {
            id: this.getUserId(),
            birthdate: this.birthdate,
            tel: this.tel,
            username: this.username,
            email: this.email,
            name: this.name,
            surname: this.surname,
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
    username: string;
    email: string;
    name: string;
    surname: string;
  }