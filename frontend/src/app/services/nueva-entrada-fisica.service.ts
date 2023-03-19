import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":" Token 481d943276a0f7ce3966f137c256587fdbd166a5"})
};

@Injectable({
  providedIn: 'root'
})
export class NuevaEntradaFisicaService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient, private uService: UsersService) {}

  postEntry(dataEntry:any): Observable<any>{
    return this.http.post(`${this.urlApi}/diary_entries/physical_entry/`, JSON.stringify(dataEntry), httpOptions);
  }

}
