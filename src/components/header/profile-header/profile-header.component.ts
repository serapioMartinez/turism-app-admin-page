import { Component, inject } from '@angular/core';
import { Globals } from '../../../classes/Globals';
import { Router } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { firstValueFrom } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../../../classes/LoginResponse';

@Component({
  selector: 'turism-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
  username = Globals.username;

  constructor(private router:Router){}

  async logout(){
    const response: HttpResponse<LoginResponse> = await firstValueFrom(this.http.logout());
    console.log(response.body)
    Globals.isUserLogged = false;
    Globals.username = undefined;
    Globals.userType = undefined;
    setTimeout(() =>this.router.navigate(['app/auth/login']),800)
  }

  private readonly http = inject(HttpRequestService);
}
