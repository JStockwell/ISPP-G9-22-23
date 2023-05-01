import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { urlAPI } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PaginaInicialService {

  constructor(private http: HttpClient, private uService: UsersService) { }

  getIdentificador():boolean{
    let resultado = false;
    if(this.uService.isLoggedIn()){

      var ck = localStorage.getItem('auth-user');
      

      if(ck!=null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }

        if (res[1])

        resultado = true;
        
        

        return resultado
      }
    }
    return resultado
  }





  
}
