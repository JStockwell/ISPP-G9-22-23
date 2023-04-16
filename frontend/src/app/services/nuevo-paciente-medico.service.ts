import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { MedicsService } from "./medics.service";
import { API_URL } from './settings';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": 'Token b5a02b7a4d2332a99e78a7305f8a0d24fab5af67' })
};

@Injectable({
  providedIn: 'root'
})
export class NuevoPacienteMedicoService {

  
  constructor(private http: HttpClient, private uService: UsersService, private mService: MedicsService) {}




  postPatient(dataEntry: any): Observable<any>{
    
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
        
        return this.http.post(API_URL+'users/medics/'+res[1]+'/patient/'+dataEntry.code+'/', JSON.stringify(dataEntry.code), {'headers':headers});
      }

    }
    return new Observable<any>;
  }

  
 

  



 


}
