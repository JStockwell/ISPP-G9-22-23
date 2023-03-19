import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewAnalyticService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  getMetricInfo(): Observable<any> {
    return this.http.get(`${this.urlApi}/metrics/info/list/`);
  }
  
  postMetric(metricDataEntry: any = {}): Observable<any> {
    return this.http.post(`${this.urlApi}/metrics/metrics/`, JSON.stringify(metricDataEntry));
  }

  postMeasure(measureDataEntry: any = {}): Observable<any> {
    return this.http.post(`${this.urlApi}/metrics/measures/`, JSON.stringify(measureDataEntry));
  }

}
