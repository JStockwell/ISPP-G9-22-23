import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient, private uService: UsersService) {}
  
  getAppointmentsList(): Observable<any>{
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
        
        return this.http.get(`${this.urlApi}/appointments/patient/`+res[1]+"/", {'headers':headers});
      }

    }
    return new Observable<any>;
  }
}
