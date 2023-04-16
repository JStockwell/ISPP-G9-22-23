import { Injectable } from '@angular/core';
import { API_URL } from './settings';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
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


  clean():void{
    localStorage.clear();
  }

  public saveUser(user:any): void{
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():any {
    const user = localStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    
    if (user){
      return true;
    }

    return false;
  }


  deleteUser(idEntry:any): Observable<any>{
    
    if(this.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        headers=headers.set('Authorization','Token '+res[0])
  
        return this.http.delete(`${API_URL}users/patients/${idEntry}`, {'headers':headers});
      }
  
    }
    return new Observable<any>;
  }

  //Llamadas de auth

  public register(user:any): Observable<any>{
    return this.http.post(API_URL+'users/patients/',user,httpOptions)
  }

  login(user:any): Observable<any> {
    return this.http.post(API_URL+'users/login/',user,httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(API_URL+ 'signout', { }, httpOptions);
  }
}
