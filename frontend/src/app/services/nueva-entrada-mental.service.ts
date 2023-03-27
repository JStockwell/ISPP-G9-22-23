import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {API_URL} from './settings';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NuevaEntradaMentalService {

  

  constructor(private http: HttpClient, private uService: UsersService) {}

  postEntry(dataEntry:any): Observable<any>{
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
        
        return this.http.post(`${API_URL}/diary_entries/mental_entry/`, JSON.stringify(dataEntry), {'headers':headers});
      }

    }
    return new Observable<any>;
  }

}