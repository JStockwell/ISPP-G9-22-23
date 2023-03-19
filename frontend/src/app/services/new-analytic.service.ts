import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":" Token 481d943276a0f7ce3966f137c256587fdbd166a5"})
};


@Injectable({
  providedIn: 'root'
})
export class NewAnalyticService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  getMetricsInfoList(): Observable<any>{
    return this.http.get(`${this.urlApi}/metrics/info/list/`, httpOptions);
  }
  
  postMetric(metricDataEntry: any = {}): Observable<any> {
    return this.http.post(`${this.urlApi}/metrics/metrics/`, JSON.stringify(metricDataEntry), httpOptions);
  }

  postMeasure(measureDataEntry: any = {}): Observable<any> {
    return this.http.post(`${this.urlApi}/metrics/measures/`, JSON.stringify(measureDataEntry), httpOptions);
  }

}
