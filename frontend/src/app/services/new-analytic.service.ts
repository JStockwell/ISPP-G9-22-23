import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { API_URL } from './settings';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": 'Token b5a02b7a4d2332a99e78a7305f8a0d24fab5af67' })
};

@Injectable({
  providedIn: 'root'
})
export class NewAnalyticService {


  constructor(private http: HttpClient, private uService: UsersService) {}

  getMetricsNotUsedList(): Observable<any>{
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
        return this.http.get(API_URL+'metrics/info/not_used/'+res[1]+"/", {'headers':headers});
      }

    }
    return new Observable<any>;
  }

  postMetricEntry(dataMetricEntry:any): Observable<any>{
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
        
        return this.http.post(API_URL+'metrics/metrics/', JSON.stringify(dataMetricEntry), {'headers':headers});
      }

    }
    return new Observable<any>;
  }

  postMeasureEntry(dataMeasureEntry:any): Observable<any>{
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
        console.log(dataMeasureEntry)
        return this.http.post(API_URL+'metrics/measures/', JSON.stringify(dataMeasureEntry), {'headers':headers});
      }

    }
    return new Observable<any>;
  }

}
