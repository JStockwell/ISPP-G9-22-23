import { Component, OnInit } from '@angular/core';
import {MedicsService} from '../../services/medics.service'
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './medics.page.html',
  styleUrls: ['./medics.page.scss'],
})

export class MedicsPage implements OnInit {
  form:any ={
    username: null,
    password:null,
    r_password:null,
    first_name:null,
    last_name:null,
    email:null,
    tel:null,
    birthdate:null
  }
  
  loginCredentials: any = {
    username: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  isLoginFailed = false;
  errorMessage = '';


  
  constructor(private uService: MedicsService, private http: HttpClient) { }
  ngOnInit() {

  }

  regForm(): void{
    if(this.form.password == this.form.r_password){
      this.uService.register(this.form).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          
          // SE PROCEDE AL REGISTRO
          this.loginCredentials.username = this.form.username;
          this.loginCredentials.password = this.form.password;
          this.uService.login(this.loginCredentials).subscribe({
            next: data => {

              this.uService.saveMedic(data);
              this.reloadPage();
            },
            error: err => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
              window.alert("Registro correcto pero algo falló al iniciar sesión.");
            }
          });
        },
        error: err => {
          this.errorMessage=err.error.message;
          this.isSignUpFailed = true;
        }
      })
    }
    else{
      var campo = <HTMLElement>document.getElementById("invalid-r")
      campo.style.display = "block";
      campo.style.paddingLeft = "5%";
    }
  }

  reloadPage(): void{
    window.location.href="medic/home"
  }

   

}
