import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  urlApi:string = "https://isppgrupo9.pythonanywhere.com"

  constructor(private http: HttpClient, private uService: UsersService) {}

  eventos = [
    {
      date: '2023-03-05',
      time: '12:35',
    },
    {
      date: '2023-03-10',
      time: '13:40',
    },
    {
      date: '2023-03-20',
      time: '08:30',
    },
    {
      date: '2023-03-30',
      time: '12:10',
    },
    {
      date: '2023-03-30',
      time: '10:35',
    },
  ];

  filterByDate(selectedDate: string) {
    return this.eventos.filter(event => event.date === selectedDate)
    .sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });
  }
  
  getAppointmentsList(): Observable<any>{
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
        
        return this.http.get(`${this.urlApi}/appointments/patient/`+res[1]+"/", {'headers':headers});
      }

    }
    return new Observable<any>;
  }
}
