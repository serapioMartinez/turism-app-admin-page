import { Component, ElementRef } from '@angular/core';
import { IAdminCityItem } from '../../admin-city-item/i-admin-city-item';
import { CiudadRequestService } from '../../../../services/ciudad-request.service';
import { ActivatedRoute } from '@angular/router';
import { AdminCityItemComponent } from '../../admin-city-item/admin-city-item.component';
import { PlaceEntity } from '../../../../classes/entities/Place';
import { orderPlacesOptions } from '../../../../assets/application-data.json';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Globals } from '../../../../classes/Globals';
import { PlaceRowComponent } from '../place-row/place-row.component';
import { FormPlaceComponent } from '../form-place/form-place.component';
import { firstValueFrom } from 'rxjs';
import { Validations } from '../../../../classes/Validations';

import { tipoZona } from '../../../../assets/application-data.json'
import { AbstractAdminCityItems } from '../../admin-city-item/abs-admin-city-item';

@Component({
  selector: 'app-admin-city-places',
  standalone: true,
  imports: [AdminCityItemComponent],
  templateUrl: './admin-city-places.component.html',
  styles: ``
})
export class AdminCityPlacesComponent extends AbstractAdminCityItems{

  constructor(private http: CiudadRequestService, private activatedRoute: ActivatedRoute, private elRef: ElementRef){
    super();
    elRef.nativeElement.className = 'flex-fill';
    
    activatedRoute.data.subscribe({
      next: (data) => {
          const res: HttpResponse<any> = data["cityPlaces"];
          if(res.ok){
            res.headers.keys();
            const headers: HttpHeaders = res.headers;
            this.count = Number.parseInt(headers.get(Globals.paginationHeaderes.count) ?? '0');
            this.page = (this.count == 0) ? 0 : Number.parseInt(headers.get(Globals.paginationHeaderes.page) ?? '0');
            this.limit = Number.parseInt(headers.get(Globals.paginationHeaderes.limit) ?? '0');

            this.places = res.body; 
          }
      },
    })
  }

  onClickAddNewItem(item: PlaceEntity): void {
    if (this.place.nombre != null) {
      let confirmation = window.confirm("You have unsaved data. Continue without saving data?");
      if (!confirmation) return;
    }
    Object.assign(this.place, item ? item : <PlaceEntity>{});
    this.toogleForm(true);
  }
  
  async onSubmitItemData(): Promise<void> {
    if(this.fieldsAreValid()){
      const res = await firstValueFrom(this.http.postCityPlace(this.place));
      if(res.ok){
        this.place = <PlaceEntity>res.body;
        let index = this.places.findIndex( (p) => {
          return p.idZona === this.place.idZona;
        })
        if(index<0) this.places = [this.place, ...this.places];
        else this.places[index] = this.place;

        this.place = <PlaceEntity>{};
      }
    }
  }
  
  provideItemRow() {
    return PlaceRowComponent;
  }
  provideRowInputs(item: PlaceEntity) {
    return {
      "place": item,
      "onClickEditItem": () => this.onClickEditItem(item)
    }
  }
  provideFormType() {
    return FormPlaceComponent;
  }
  provideFormInputs() {
    return {
      "place": this.place,
      "submitAction": () => this.onSubmitItemData()
    }
  }
  async chargePage(page: number = 1): Promise<void> {
    if(page>0 && page<=this.getMaxPages()){
      const res = await firstValueFrom(this.http.getCityPlaces(page, orderPlacesOptions[this.selectedOption]));
      if(res.ok){
        this.places = res.body;
        this.page = page;
      }
    }
  }

  private fieldsAreValid(): boolean{
    let result = true;
    let input:any= <HTMLInputElement>document.getElementById("name");
    Validations.validateText(input) ? 1 == 1 : result = false;

    input = <HTMLSelectElement>document.getElementById("type");
    Validations.validateOption(tipoZona, input) ? 1 == 1 : result = false;

    input = <HTMLInputElement>document.getElementById("desc");
    Validations.validateText(input) ? 1 == 1 : result = false;

    return result;
  }

  
  places: Array<PlaceEntity> = [];
  place: PlaceEntity = <PlaceEntity>{};
  orderOptions = orderPlacesOptions;


}


