import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api_url = 'http://isppgrupo9.pythonanywhere.com/';
  constructor(private Http: HttpClient) { }


  getMessageRegister(usuario: { username: string | undefined; password: string | undefined; first_name: string | undefined; last_name: string | undefined; email: string | undefined; tel: string | undefined; birthdate: string | undefined; } | undefined){
    return this.Http.post('http://isppgrupo9.pythonanywhere.com/users/patients/', usuario).pipe(
      catchError(this.handleError('añadirUsuario', usuario))
    );
  }

  handleError(arg0: string, usuario: { username: string | undefined; password: string | undefined; first_name: string | undefined; last_name: string | undefined; email: string | undefined; tel: string | undefined; birthdate: string | undefined; } | undefined): (err: any, caught: import("rxjs").Observable<Object>) => import("rxjs").ObservableInput<any> {
    throw new Error('Se ha producido un error.');
  }


  getMessage(){
    return this.Http.get(this.api_url+'users/patients/list/');
  }
}
