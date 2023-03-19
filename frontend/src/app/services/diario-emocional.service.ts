import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiarioEmocionalService {


  

  constructor(private http: HttpClient) { }

  API_URL = 'http://isppgrupo9.pythonanywhere.com/';


  
  public getDiarioEmocional(): Observable<Object> {
  
    return this.http.get(this.API_URL+'diary_entries/mental_entry/list', httpOptions);
  
  }




}

