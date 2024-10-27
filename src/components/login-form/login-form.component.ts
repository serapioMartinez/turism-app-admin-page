import { Component, inject, Input, OnInit } from '@angular/core';
import {Form, FormsModule} from '@angular/forms'
import { turismAppAPI } from '../../environments/dev-environment';
import { HttpRequestService } from '../../services/http-request.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../../classes/LoginRequest';
import { LoginResponse } from '../../classes/LoginResponse';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Globals } from '../../classes/Globals';

@Component({
  selector: 'ta-login-form',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  providers: [Globals],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent{

  constructor(private router: Router){}

  sendLoginRequest(event: SubmitEvent){
    
    let form = <HTMLFormElement> document.getElementById('login-form');

    if(!form.checkValidity()){
      form.classList.add('was-validated');
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.disabledForm = true;

    this.http.loginRequest(this.loginBody)
            .subscribe({
              error: (err: HttpErrorResponse) => {
                  console.error(err.message);
                  console.error(err);
                  if(err.status == 403){
                    this.errorMessage = "Invalid credentials!"
                  }else{
                    this.errorMessage = "An error has ocurred. Try again later!"
                  }
                  this.errorBannerHidden = false;
                  this.disabledForm = false;
              },
              next: (value: HttpResponse<LoginResponse>) => {
                  console.log(value.body);
                  this.disabledForm = false;
                  this.successBanner = !this.successBanner;
                  Globals.isUserLogged = true;
                  Globals.userType = value.body?.userType;
                  Globals.username = value.body?.username;
                  setTimeout(() => {
                    if(Globals.userType === 'C') this.router.navigate(['app/city']);
                    else if(Globals.userType === 'E') this.router.navigate(['app/business']);
                  },500);
              },
              complete() {
                  
              },
            })
  }

  private http = inject(HttpRequestService);
  username = '';
  password = '';
  errorMessage = "Login failed!."
  errorBannerHidden = true;
  successBanner = true;
  disabledForm = false;

  loginBody = new LoginRequest();
}
