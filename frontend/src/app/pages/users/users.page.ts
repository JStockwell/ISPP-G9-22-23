import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  username: string | undefined
  password:  string| undefined
  first_name: string | undefined 
  last_name: string | undefined
  email: string | undefined
  tel: string | undefined
  birthdate: string | undefined
  msg:any
  usuarios: any;
  constructor(private uService: UsersService) { }

  ngOnInit() {
  }

  registrarUsuario(){
    let usuario = {
  
      username: this.username,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      tel: this.tel,
      birthdate: this.birthdate
    }
    console.log(usuario)
    this.uService.getMessageRegister(usuario).subscribe(usuario => this.usuarios.push(usuario));
  }

}
