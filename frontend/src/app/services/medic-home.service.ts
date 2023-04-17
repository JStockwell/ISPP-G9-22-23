import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { MedicsService } from "./medics.service";
import { API_URL } from "./settings";

@Injectable({
  providedIn: "root",
})
export class MedicHomeService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });
    return next.handle(req);
  }

  constructor(private http: HttpClient, private mService: MedicsService) {}

  getPacientes(): Observable<any> {
    if (this.mService.isLoggedIn()) {
      var ck = localStorage.getItem("auth-user");
      if (ck != null) {
        var tk = JSON.parse(ck);
        var res = [];
        for (var i in tk) {
          res.push(tk[i]);
        }
        let headers = new HttpHeaders();
        headers = headers.set("Authorization", "Token " + res[0]);

        return this.http.get(
          API_URL + "users/medics/" + res[1] + "/patients",
          { headers: headers }
        );
      }
    }
    return new Observable<any>();
  }

  getPaciente(id_paciente:any): Observable<any> {
    if (this.mService.isLoggedIn()) {
      var ck = localStorage.getItem("auth-user");
      if (ck != null) {
        var tk = JSON.parse(ck);
        var res = [];
        for (var i in tk) {
          res.push(tk[i]);
        }
        let headers = new HttpHeaders();
        headers = headers.set("Authorization", "Token " + res[0]);

        return this.http.get(
          API_URL + "users/patients/" + id_paciente ,
          { headers: headers }
        );
      }
    }
    return new Observable<any>();
  }


 


}

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: MedicHomeService, multi: true },
];
