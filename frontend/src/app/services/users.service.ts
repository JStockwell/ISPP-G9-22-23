import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  API_URL = 'http://isppgrupo9.pythonanywhere.com/';

  clean():void{
    window.sessionStorage.clear();
  }

  public saveUser(user:any): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  //Llamadas de auth

  public register(user:any): Observable<any>{
    return this.http.post(this.API_URL+'users/patients/',user,httpOptions)
  }

  login(user:any): Observable<any> {
    return this.http.post(this.API_URL+'users/login/',user,httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(this.API_URL+ 'signout', { }, httpOptions);
  }




}
