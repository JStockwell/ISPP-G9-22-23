import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarFisicoService implements HttpInterceptor{

  constructor(private http: HttpClient, private uService: UsersService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req=req.clone({
      withCredentials: true
    });
    return next.handle(req)
  }

  API_URL = 'http://isppgrupo9.pythonanywhere.com/'

  getEntradasFisica(id_fisico:any):Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck!=null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders()
        headers = headers.set('Authorization', 'Token '+res[0])

        return this.http.get(this.API_URL + `diary_entries/physical_entry/${id_fisico}`,{'headers':headers})
      }
    }
    return new Observable<any>;
  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
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

  modifyEntradasFisica(id_fisico:any):Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck!=null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders()
        headers = headers.set('Authorization', 'Token '+res[0])

        return new Observable<any>;
      }
    }
    return new Observable<any>;
  }
}
