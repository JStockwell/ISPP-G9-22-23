import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './settings';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AñadirDetallesAnaliticasService {

  API_URL:string = API_URL;

  constructor(private http: HttpClient, private uService: UsersService) {}

  postEntry(entry:any): Observable<any> {
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
        if(ck != null){
          var tk = JSON.parse(ck);
          var res = [];
          for(var i in tk){
            res.push(tk[i]);
        }
        let headers = new HttpHeaders()
        headers=headers.set('Authorization','Token '+res[0])
        headers = headers.set('Content-Type', 'application/json')
        return this.http.post(`${this.API_URL}/metrics/measures/`, JSON.stringify(entry),{'headers':headers});
      }
    }
    return new Observable<any>;
  }

}