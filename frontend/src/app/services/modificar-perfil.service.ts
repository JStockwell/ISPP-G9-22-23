import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './settings';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarPerfilService implements HttpInterceptor{

  constructor(private http: HttpClient, private uService: UsersService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req=req.clone({
      withCredentials: true
    });
    return next.handle(req)
  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck!=null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        return res[1];
      }
    }
    return null;
  }

  getEntradaUser(id_user:any):Observable<any> {
        if(this.uService.isLoggedIn()){
          var ck = localStorage.getItem('auth-user')
          if(ck!=null){
            var tk = JSON.parse(ck);
            var res = [];
            for(var i in tk){
              res.push(tk[i]);
            }
            let headers = new HttpHeaders()
            headers = headers.set('Authorization', 'Token '+res[0])
    
            return this.http.get(API_URL + `users/patients/${id_user}`,{'headers':headers})
          }
        }
        return new Observable<any>;
    }

  modifyDatosPerfil(id_user:any, dataEntry:any):Observable<any>{
    console.log("datos en servicio", dataEntry);
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck!=null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        headers = headers.set('Authorization', 'Token '+res[0])

        // modificar endpoint para poner el que edita los datos de perfil
        return this.http.put(`${API_URL}users/patients/${id_user}/`, JSON.stringify(dataEntry), {'headers': headers});
      }
    }
    return new Observable<any>;
  }
}