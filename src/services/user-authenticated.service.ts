import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { HttpRequestService } from './http-request.service';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../classes/LoginResponse';
import { Globals } from '../classes/Globals';
import { ErrorProviderService } from './error-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedService implements Resolve<any> {

  constructor(private router: Router, private errorProvider: ErrorProviderService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (Globals.isUserLogged != undefined) return;
    try {
      const res = await firstValueFrom(this.http.isUserLogged());

      this.setGlobals(true, res.body?.userType, res.body?.username);
      console.log(res.body?.message);
      return;
    }
    catch (error: any) {
      let err: HttpErrorResponse = error;
      if (err.status === 0) {
        this.boundError();
        return;
      }

      try {
        const refresh = await this.http.refreskToken();
        if (refresh.username) {
          const body: LoginResponse = refresh;
          this.setGlobals(true, body.userType, body.username)
          return;
        }else throw refresh;
      } catch (error: any) {
        err = error;
        if (err.status === 0) {
          this.boundError()
          return;
        }
        Globals.isUserLogged = false;
        console.error(error.message);
        return;
      }
    }

  }

  private setGlobals(isLogged: boolean | undefined, userType: string | undefined, username: string | undefined) {
    Globals.isUserLogged = isLogged;
    Globals.userType = userType;
    Globals.username = username;
  }

  private boundError() {
    this.errorProvider.error_message = 'User authenticated verification failed!';
    this.errorProvider.page_refresh = document.location.pathname;
    this.router.navigate(['error']);
  }

  private readonly http = inject(HttpRequestService);
}
