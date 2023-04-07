import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { API_URL, eventos } from './settings';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient, private uService: UsersService) {}

  filterByDate(selectedDate: string, eventos: any[]) {
    return eventos.filter(event => event.date === selectedDate)
    .sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });
  }

  cambiarColorEventos(lista: any) {
    let colorTextoEvento = 'var(--ion-color-secondary-contrast)';
    let colorFondoEvento = 'var(--ion-color-secondary)';
    for (let item of lista) {
        item["textColor"] = colorTextoEvento;
        item["backgroundColor"] = colorFondoEvento;
    }
  }

  cambiarFormatoHora(jsonEventos: any[]) {
    jsonEventos.forEach((item: any) => {
      let [horas, minutos, segundos] = item.time.split(':');
      let nuevaHora = `${horas}:${minutos}`;
      item.time = nuevaHora;
    });
  }

  setEventosList(){
    this.getAppointmentsList().subscribe((res) => {
      this.cambiarColorEventos(res);
      this.cambiarFormatoHora(res);
      Object.assign(eventos, res);
    }
  )}
  
  getAppointmentsList(): Observable<any>{
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        headers=headers.set('Authorization','Token '+res[0])
        
        return this.http.get(`${API_URL}/appointments/appointments/patient/`+res[1]+"/", {'headers':headers});
      }

    }
    return new Observable<any>;
  }

  deleteAppointment(idEntry:any): Observable<any>{
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
        
        return this.http.delete(`${API_URL}/appointments/appointments/${idEntry}`, {'headers':headers});
      }

    }
    return new Observable<any>;
  }
}
