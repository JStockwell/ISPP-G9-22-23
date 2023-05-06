import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { PaginaInicialService } from '../services/pagina-inicial.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage implements OnInit {

  constructor(private uService:UsersService, private HomeService: PaginaInicialService) { }

  ngOnInit() {
  }

  userLoggedIn():boolean{
    return this.uService.isLoggedIn();
  }

  toMainPage(){
    if(this.estaLogMedico()){
      window.location.href="medic/home";
      
    }
    else{
      window.location.href="app/Tabs/Analytics";
    }
    


  }


  //Comprueba que se ha iniciado sesión con una cuenta de médico, para redirigir a las vistas que solo pueden ver los médicos.


  estaLogMedico(){
    let resultado = false;
    if(this.uService.isLoggedIn()){
    var ck = localStorage.getItem('auth-user');

    
      if(ck!=null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          if (i == "medic id"){
            resultado = true;
          }
        }

        
        return resultado
      }
  }
  return resultado
  }

}
