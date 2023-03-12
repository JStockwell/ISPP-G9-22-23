import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnaliticasService {

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