import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { API_URL } from './settings';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":" Token 481d943276a0f7ce3966f137c256587fdbd166a5"})
};

@Injectable({
  providedIn: 'root'
})
export class DiarioEmocionalService {


  

  constructor(private http: HttpClient,private uService: UsersService) { }


  
  public getDiarioEmocional(): Observable<any> {
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
      }
      let headers = new HttpHeaders()
      headers=headers.set('Authorization','Token '+res[0])

      return this.http.get(API_URL+'diary_entries/mental_entry/patient/'+ res[1]+"/",{'headers':headers});
    }
    
  
  }
   return new Observable<any>;

}

deleteEntry(idEntry:any): Observable<any>{
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

      return this.http.delete(`${API_URL}diary_entries/mental_entry/${idEntry}`, {'headers':headers});
    }

  }
  return new Observable<any>;
}

}
