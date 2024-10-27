import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginPath, pokeAPIAddress, turismAppAPI, userisloggedPath, registrationPath, logoutPath, refreshTokenPath } from '../environments/dev-environment';
import { LoginRequest } from '../classes/LoginRequest';
import { LoginResponse } from '../classes/LoginResponse';
import { RegisterRequest } from '../classes/RegisterRequest';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

declare const Zone: any;

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  async refreskToken(){
    try {
      const res: HttpResponse<LoginResponse> =
        await firstValueFrom(
          this.http.post<HttpResponse<LoginResponse>>(
            turismAppAPI.concat(refreshTokenPath),null, this.httpOptions));
      return res.body;
    } catch (err: any) {
      return err;
    }
  }

  logout() {
    return this.http.delete<HttpResponse<LoginResponse>>(turismAppAPI.concat(logoutPath), this.httpOptions);
  }

  isUserLogged2() {
    return fetch(turismAppAPI.concat(userisloggedPath), {
      method: 'GET'
    });
  }

  isUserLogged() {
    return this.http.get<HttpResponse<LoginResponse>>(turismAppAPI.concat(userisloggedPath), this.httpOptions);
  }

  loginRequest(loginbody: LoginRequest) {
    return this.http.post<HttpResponse<LoginResponse>>
      (turismAppAPI.concat(loginPath), JSON.stringify(loginbody), this.httpOptions);
  }

  getPokeImage(pokemonId: string) {
    return this.http.get(pokeAPIAddress.concat(pokemonId));
  }

  registerUserRequest(registrationBody: RegisterRequest) {
    return this.http.post<HttpResponse<LoginResponse>>
      (turismAppAPI.concat(registrationPath), JSON.stringify(registrationBody), this.httpOptions);
  }

  async waitFor<T>(prom: Promise<T> | Observable<T>): Promise<T> {
    if (isObservable(prom)) {
      prom = firstValueFrom(prom);
    }
    const macroTask = Zone.current
      .scheduleMacroTask(
        `WAITFOR-${Math.random()}`,
        () => { },
        {},
        () => { }
      );
    return prom.then((p: T) => {
      macroTask.invoke();
      return p;
    });
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    observe: "response" as "body",
    responseType: "json" as "json",
    withCredentials: true
  };

}
