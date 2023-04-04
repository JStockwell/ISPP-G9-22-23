import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage implements OnInit {

  constructor(private uService:UsersService) { }

  ngOnInit() {
  }

  userLoggedIn():boolean{
    return this.uService.isLoggedIn();
  }

  toMainPage(){
    window.location.href="app/Tabs/Analytics"
  }

}
