import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { urlAPI } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ModificarCitaService {

  constructor(private http: HttpClient, private uService: UsersService) {}

  getCita(idCita:any):Observable<any>{
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

        return this.http.get(urlAPI + `/appointments/appointments/${idCita}`,{'headers':headers})
      }
    }
    return new Observable<any>;
  }

  updateEntry(idEntry:any, dataEntry:any): Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        headers=headers.set('Authorization','Token '+res[0])
        
        return this.http.put(`${urlAPI}/appointments/appointments/${idEntry}/`, JSON.stringify(dataEntry), {'headers':headers});
      }

    }
    return new Observable<any>;
  }
}
