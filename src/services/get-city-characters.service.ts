import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CiudadRequestService } from './ciudad-request.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCityCharactersService implements Resolve<Array<any>|null>{

  constructor(private http: CiudadRequestService) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>{
    return await firstValueFrom(this.http.getUserCityCharacters());
  }
}
