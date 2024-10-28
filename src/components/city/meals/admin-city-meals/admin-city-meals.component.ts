import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MealEntity } from '../../../../classes/entities/Meal';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Globals } from '../../../../classes/Globals';
import { FilterItemsComponent } from '../../../filter-items/filter-items.component';
import { orderMealsOptions } from '../../../../assets/application-data.json';
import { CiudadRequestService } from '../../../../services/ciudad-request.service';
import { firstValueFrom } from 'rxjs';
import { Validations } from '../../../../classes/Validations';
import { AbstractAdminCityItems } from '../../admin-city-item/abs-admin-city-item';
import { MealRowComponent } from '../meal-row/meal-row.component';
import { FormMealComponent } from '../form-meal/form-meal.component';
import { AdminCityItemComponent } from '../../admin-city-item/admin-city-item.component';

@Component({
  selector: 'app-admin-city-meals',
  standalone: true,
  imports: [AdminCityItemComponent],
  templateUrl: './admin-city-meals.component.html',
})
export class AdminCityMealsComponent extends AbstractAdminCityItems {

  constructor(private activatedRoute: ActivatedRoute, private elRef: ElementRef) {
    super();
    elRef.nativeElement.className = 'flex-fill';

    this.activatedRoute.data.subscribe({
      next: (value) => {
        const res = value["userCityMeals"];
        res.headers.keys()
        const headers: HttpHeaders = res.headers;
        this.count = Number.parseInt(headers.get(Globals.paginationHeaderes.count) ?? '0');
        this.page = (this.count == 0) ? 0 : Number.parseInt(headers.get(Globals.paginationHeaderes.page) ?? '0');
        this.limit = Number.parseInt(headers.get(Globals.paginationHeaderes.limit) ?? '0');

        this.meals = res.body;
      },
    })
  }

  async onSubmitItemData(): Promise<void> {
    if (this.mealFieldsAreValid()) {
      const res: HttpResponse<MealEntity> = await firstValueFrom(this.http.postCityMeal(this.item));
      if (res.ok) {
        this.item = <MealEntity>res.body;
        let meal_index = this.meals.findIndex((m) => {
          return m.idPlatillo == this.item.idPlatillo;
        });
        if (meal_index < 0) this.meals = [this.item, ...this.meals];
        else this.meals[meal_index] = this.item;

        this.item = <MealEntity>{};
      }
    }
  }
  override provideItemRow() {
    return MealRowComponent;
  }

  override provideFormType() {
    return FormMealComponent;
  }

  async chargePage(page: number = 0) {
    if (page > 0 && page <= this.getMaxPages()) {
      const res = await firstValueFrom(this.http.getUserCityMeals(page, this.orderOptions[this.selectedOption]));
      if (res.ok) {
        this.meals = <MealEntity[]>res.body;
        this.page = page;
      }
    }
  }

  onClickAddNewItem(meal?: MealEntity) {
    if (this.item.nombre != null) {
      let confirmation = window.confirm("You have unsaved data. Continue without saving data?");
      if (!confirmation) return;
    }
    this.item = Object.assign(this.item, meal ? meal : <MealEntity>{});
    this.toogleForm(true)
  }

  private mealFieldsAreValid(): boolean {
    let result = true;
    let input = <HTMLInputElement>document.getElementById("name");
    Validations.validateText(input) ? 1 == 1 : result = false;

    input = <HTMLInputElement>document.getElementById("desc");
    Validations.validateText(input) ? 1 == 1 : result = false;

    return result;
  }

  orderOptions = orderMealsOptions;

  meals: Array<MealEntity> = [];

  override item: MealEntity = <MealEntity>{};

  private http = inject(CiudadRequestService);

}
