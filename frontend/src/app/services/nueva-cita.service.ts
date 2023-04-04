import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { urlAPI } from '../global';

@Injectable({
  providedIn: 'root'
})
export class NuevaCitaService {

  constructor(private http: HttpClient, private uService: UsersService) {}

  postEntry(dataEntry:any): Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        headers=headers.set('Authorization','Token '+res[0])
        
        return this.http.post(`${urlAPI}/appointments/appointments/`, JSON.stringify(dataEntry), {'headers':headers});
      }

    }
    return new Observable<any>;
  }
}
