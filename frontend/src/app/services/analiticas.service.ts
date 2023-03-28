import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable } from 'rxjs';
import { UsersService } from'./users.service';



@Injectable({
  providedIn: 'root'
})


export class AnaliticasService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req=req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }

  constructor(private http: HttpClient, private uService: UsersService) { }

  API_URL = 'http://develop-isppgrupo9.pythonanywhere.com/'
  //DESCOMENTAR
/*
  getAnaliticas(): Observable<APIResult>{
    
    return this.http.get(`${environment.baseURL}`);
  }
*/
  //A borrar tras el desarrollo
  getAnaliticas():Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders()
        headers=headers.set('Authorization','Token '+res[0])
        return this.http.get(this.API_URL + "metrics/metrics/patient/"+ res[1]+"/",{'headers':headers});
      }

    }
    return new Observable<any>;
  }
  getAnaliticaDetails():Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders()
        headers=headers.set('Authorization','Token '+res[0])
        
        return this.http.get(this.API_URL + "metrics/measures/patient/"+ res[1]+"/",{'headers':headers});
      }

    }
    return new Observable<any>;

  }
  getLatestDetails(metricId: any):Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders()
        headers=headers.set('Authorization','Token '+res[0])
        
        return this.http.get(this.API_URL + "metrics/measures/patient/"+ res[1]+"/metric/"+metricId+"/",{'headers':headers});
      }

    }
    return new Observable<any>;

  }

  deleteAnalitica(analiticaId: any):Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders();
        headers=headers.set('Authorization', 'Token '+res[0])
        return this.http.delete(this.API_URL + `metrics/metrics/${analiticaId}`,{'headers':headers})
      }
    }
    return new Observable<any>
  }

  deleteEntry(idEntry:any): Observable<any>{
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
  
        return this.http.delete(`${this.API_URL}/metrics/measures/${idEntry}`, {'headers':headers});
      }
  
    }
    return new Observable<any>;
  }
 

}

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AnaliticasService, multi:true}
]