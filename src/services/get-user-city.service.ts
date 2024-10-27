import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { CityEntity } from '../classes/entities/City';
import { CiudadRequestService } from './ciudad-request.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserCityService implements Resolve<Promise<CityEntity|null>>{

  constructor(private  http: CiudadRequestService) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CityEntity|null>{
    let res;
    try{
      res = (await firstValueFrom(this.http.getUserCity())).body;
    }catch(err:any){
      res = err;
    }

    console.log(res)

    return new Promise<CityEntity>((resolve, reject) => {
      if(res instanceof HttpErrorResponse) reject(res);
      else resolve(res);
    });
  }
}
