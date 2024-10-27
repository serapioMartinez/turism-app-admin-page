import { Component, inject } from '@angular/core';
import { HttpRequestService } from '../../services/http-request.service';
import { RegisterRequest } from '../../classes/RegisterRequest';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Validations } from '../../classes/Validations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  sendRegisterRequest(event: SubmitEvent) {

    let reg_form = <HTMLFormElement>document.getElementById("register-form");

    event.preventDefault();
    event.stopPropagation();

    if (this.validateRegisterFields() && reg_form.checkValidity()) {
      this.http.registerUserRequest(this.registerRequest)
            .subscribe({
              error: (error: HttpErrorResponse) => {
                this.errorBannerHidden = false
                if (error.status == 0) this.errorMessage = "An error has ocurred!. Try again Later"
                else this.errorMessage = "User couldn't be created. User may already exist in records!"
              },
              next: (response) => {
                this.registerRequest = new RegisterRequest();
                this.successRegistration = false;
                this.errorBannerHidden = true;
              }
            })
      return;
    }

  }
  validateRegisterFields() {
    let result = true;
    if (!this.validateEMail()) result = false;
    if (!this.validatePassword()) result = false;
    if (!this.validateConfirmationPassword()) result = false;
    return result;
  }
  
  validateEMail(){
    let input = <HTMLInputElement>document.getElementById("email");
    return Validations.validateEMail(input);
  }

  validatePassword(){
    let input = <HTMLInputElement>document.getElementById("password");
    return Validations.validatePassword(input);
  }

  validateConfirmationPassword() {
    let input = <HTMLInputElement> document.getElementById('password-confirmation')
    let result = this.confirmationPassword ==this.registerRequest.password;

    if(! result){
      input.setCustomValidity("invalid")
      return false;
    }else{
      input.setCustomValidity("")
      return true;
    }
  }

  errorBannerHidden = true;
  successRegistration = true;
  errorMessage = '';
  
  confirmationPassword = '';
  registerRequest = new RegisterRequest();
  private http = inject(HttpRequestService);
}
