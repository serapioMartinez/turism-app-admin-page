import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityEntity } from '../classes/entities/City';
import { cityOperations, turismAppAPI, userCityPath } from '../environments/dev-environment';
import { CharacterEntity } from '../classes/entities/Character';
import { MealEntity } from '../classes/entities/Meal';
import { OrderBy } from '../classes/OrderBy';

import { orderMealsOptions, orderCharactersOptions, orderPlacesOptions } from '../assets/application-data.json';
import { PlaceEntity } from '../classes/entities/Place';

@Injectable({
  providedIn: 'root'
})
export class CiudadRequestService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    observe: "response" as "body",
    responseType: "json" as "json",
    withCredentials: true
  };

  private params(page: number, orderBy: OrderBy){
    return {
      "page": page,
      "orderBy": orderBy.orderBy,
      "ascending": orderBy.ascending
    }
  }

  constructor(private http: HttpClient) { }

  getUserCity(){
    return this.http.get<HttpResponse<CityEntity>>(turismAppAPI.concat(userCityPath),this.httpOptions);
  }

  postUserCity(city: CityEntity){
    return this.http.post<HttpResponse<CityEntity>>(turismAppAPI.concat(cityOperations.postUserCity),JSON.stringify(city), this.httpOptions);
  }

  patchUserCity(city: CityEntity){
    return this.http.patch<HttpResponse<CityEntity>>(turismAppAPI.concat(cityOperations.postUserCity),JSON.stringify(city), this.httpOptions);
  }

  getUserCityCharacters(page:number = 1, orderBy: OrderBy = orderCharactersOptions[0]){
    return this.http
                  .get<HttpResponse<Array<CharacterEntity>>>(
                        turismAppAPI.concat(cityOperations.characterOperations.userCityCharactersPath), 
                        {
                          ...this.httpOptions,
                          params: {
                            "page": page,
                            "orderBy": orderBy.orderBy,
                            "ascending": orderBy.ascending
                          }
                        });
  }

  postUserCityCharacter(character: CharacterEntity){
    return this.http.post<HttpResponse<CharacterEntity>>(
                    turismAppAPI.concat(cityOperations.characterOperations.postCharacter), 
                    JSON.stringify(character),
                    this.httpOptions);
  }

  patchUserCityCharacter(character: CharacterEntity){
    return this.http.post<HttpResponse<CharacterEntity>>(
                    turismAppAPI.concat(cityOperations.characterOperations.postCharacter), 
                    JSON.stringify(character),
                    this.httpOptions);
  }

  getUserCityMeals(page:number = 1, orderBy: OrderBy = orderMealsOptions[0]){
    return this.http
                  .get<HttpResponse<Array<MealEntity>>>(
                        turismAppAPI.concat(cityOperations.mealOperations.getUserCityMeals), 
                        {
                          ...this.httpOptions,
                          params: {
                            "page": page,
                            "orderBy": orderBy.orderBy,
                            "ascending": orderBy.ascending
                          }
                        });
  }

  postCityMeal(meal: MealEntity){
    return this.http.post<HttpResponse<MealEntity>>(
      turismAppAPI.concat(cityOperations.mealOperations.postCityMeal),  
      JSON.stringify(meal),
      this.httpOptions
    );
  }

  getCityPlaces(page: number = 1, orderBy: OrderBy = orderPlacesOptions[0]){
    return this.http.get<HttpResponse<any>>(
      turismAppAPI.concat(cityOperations.placeOperations.getCityPlaces),
      {
        ...this.httpOptions,
        params: this.params(page, orderBy)
      }
    )
  }

  postCityPlace(place: PlaceEntity){
    return this.http.post<HttpResponse<PlaceEntity>>(
      turismAppAPI.concat(cityOperations.placeOperations.postCityPlace),
      JSON.stringify(place),
      this.httpOptions
    );
  }

}
