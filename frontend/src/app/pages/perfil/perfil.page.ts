import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
    id : number | any= 0;
    birthdate: string| any= '';
    tel: string | any = '';
    username: string | any='';
    email: string | any='';
    name: string | any='';
    surname: string | any='';

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        console.log("uid, ", this.getUserId());
        //console.log("datos usuario", this.getInfoUser());
        this.getInfoUser();
        console.log("datos usuario");
        console.log("on init", this.birthdate);
    }

    getUserId(){
        if(this.userService.isLoggedIn()){
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

    getInfoUser() {
        let usuario = this.userService.UserData().subscribe((res)=>{
            console.log("res infouser, ", res);
            this.id=res.id;
            this.birthdate=res.birthdate;
            this.tel= res.tel;
            this.username=res.user.username;
            this.email=res.user.email;
            this.name=res.user.first_name;
            this.surname=res.user.last_name;

          });
    }
}