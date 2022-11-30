import { Component } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  title = "Login Page"; 

  loginToSystem(userInfo:{pUserName:string, pUserPassword:string}){
    console.log(userInfo);
  }
}
