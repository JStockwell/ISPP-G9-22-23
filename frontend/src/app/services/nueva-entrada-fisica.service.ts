import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NuevaEntradaFisicaService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  post(dataEntry: any = {}): Observable<any> {
    return this.http.post(`${this.urlApi}/diary_entries/physical_entry/`, JSON.stringify(dataEntry));
  }

}
