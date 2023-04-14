import { Injectable } from '@angular/core';
import { API_URL } from './settings';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/internal/Observable';


const MEDIC_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MedicsService {

  constructor(private http: HttpClient) { }


  clean():void{
    localStorage.clear();
  }

  public saveMedic(medic:any): void{
    localStorage.removeItem(MEDIC_KEY);
    localStorage.setItem(MEDIC_KEY, JSON.stringify(medic));
  }

  public getUser():any {
    const medic = localStorage.getItem(MEDIC_KEY);
    if (medic){
      return JSON.parse(medic);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const medic = localStorage.getItem(MEDIC_KEY);
    if (medic) {
      return true;
    }

    return false;
  }

  //Llamadas de auth

  public register(medic:any): Observable<any>{
    return this.http.post(API_URL+'users/medics/',medic,httpOptions)
  }

  login(medic:any): Observable<any> {
    return this.http.post(API_URL+'medics/login/',medic,httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(API_URL+ 'signout', { }, httpOptions);
  }
}
