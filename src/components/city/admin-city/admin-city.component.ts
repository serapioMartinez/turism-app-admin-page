import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { LoadingComponent } from '../../loading/loading.component';
import { ActivatedRoute, Data } from '@angular/router';
import { CityEntity } from '../../../classes/entities/City';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { regiones, tipoTurismo } from '../../../assets/application-data.json'
import { CiudadRequestService } from '../../../services/ciudad-request.service';
import { firstValueFrom } from 'rxjs';
import { TourismType } from '../../../classes/entities/TourismType';
import { Validations } from '../../../classes/Validations';

@Component({
  selector: 'turism-admin-city',
  standalone: true,
  imports: [LoadingComponent, FormsModule],
  templateUrl: './admin-city.component.html',
  styleUrl: './admin-city.component.css'
})
export class AdminCityComponent {

  constructor(private activatedRoute: ActivatedRoute, private elRef: ElementRef) {

    elRef.nativeElement.className = 'flex-fill'
    console.log(elRef)
    console.log('City Init')

    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        const res = data["userCity"];
        if (res.idCiudad) {
          this.formDisabled = true;
          this.city = res;
          this.city.tipoTurismo = ((): Array<string> => {
            let tipos: Array<string> = [];
            const tiposTurismo: Array<TourismType> =  this.city.tipoTurismo;
            tiposTurismo.forEach((tipo) => tipos.push(tipo.idTipo))

            return tipos;
          })();
          this.updateCity = (city: CityEntity) => this.http.patchUserCity(city);
          return;
        }
        const err: HttpErrorResponse = res;

      }
    })

    console.log('City end')
  }

  async submitForm($event: SubmitEvent) {
    console.log(this.city)
    if(!this.validateFormFields()) return;
    const res = await firstValueFrom(this.updateCity(this.city));

    console.log(res)
  }

  validateFormFields(): boolean{
    let result = true;
    let input = this.getInputElement("name")
    if (!Validations.validateText(input)) result = false;
    input = this.getInputElement('town');
    if (!Validations.validateText(input)) result = false;
    input = this.getInputElement('mail')
    if (!Validations.validateEMail(input)) result = false;
    input = this.getInputElement('phone')
    if (!Validations.validatePhoneNumber(input)) result = false;
    input = this.getInputElement('emergency')
    if (!Validations.validatePhoneNumber(input)) result = false;
    input = this.getInputElement('description')
    if (!Validations.validateText(input)) result = false;
    return result;
  }

  private getInputElement(name:string): HTMLInputElement{
    return <HTMLInputElement>document.getElementById(name);
  }

  readonly regions = regiones;
  readonly tourismTypes = tipoTurismo;
  formDisabled = false;
  city: CityEntity = new CityEntity();
  private http = inject(CiudadRequestService);
  private updateCity = (city: CityEntity) => this.http.postUserCity(city)
}
