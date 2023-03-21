import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": 'Token b5a02b7a4d2332a99e78a7305f8a0d24fab5af67' })
};

@Injectable({
  providedIn: 'root'
})
export class NewAnalyticService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient, private uService: UsersService) {}

  getMetricsInfoList(): Observable<any>{
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
        
        return this.http.get(`${this.urlApi}/metrics/info/list/`, {'headers':headers});
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
        
        return this.http.post(`${this.urlApi}/metrics/metrics/`, JSON.stringify(dataMetricEntry), {'headers':headers});
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
        
        return this.http.post(`${this.urlApi}/metrics/metrics/`, JSON.stringify(dataMeasureEntry), {'headers':headers});
      }

    }
    return new Observable<any>;
  }

}
