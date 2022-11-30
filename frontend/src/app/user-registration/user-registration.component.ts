import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  title = "Registration Page";

  constructor(private http: HttpClient) { 

  }
  regToSystem(userInfo:{pEmail:string, pPassword:string, pUsername:string,pFirstname:string, pLastname:string}){
    console.log(userInfo);
    this.http.post('http://localhost:3000/user/register', userInfo).subscribe((data) => {
      console.log(data);
    });
  }
}
