import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CiudadRequestService } from './ciudad-request.service';

@Injectable({
  providedIn: 'root'
})
export class GetCityPlacesService implements Resolve<Promise<any>>{

  constructor(private http: CiudadRequestService) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return await firstValueFrom(this.http.getCityPlaces());
  }
}
