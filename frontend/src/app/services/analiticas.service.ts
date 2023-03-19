import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }
  //DESCOMENTAR
/*
  getAnaliticas(): Observable<APIResult>{
    
    return this.http.get(`${environment.baseURL}`);
  }
*/
  //A borrar tras el desarrollo
  getAnaliticas(){
    return "Hola";
  }
  getAnaliticaDetails(){

  }
}

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AnaliticasService, multi:true}
]