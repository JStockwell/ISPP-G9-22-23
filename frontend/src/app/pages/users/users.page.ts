import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service'
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit {
  
  form:any ={
    username: null,
    password:null,
    first_name:null,
    last_name:null,
    email:null,
    tel:null,
    birthdate:null

  }
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  
  constructor(private uService: UsersService, private http: HttpClient) { }
  ngOnInit() {
  }

  regForm(): void{

    this.uService.register(this.form).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage=err.error.message;
        this.isSignUpFailed = true;
      }
    })

  }

  

}
