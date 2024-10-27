import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MealEntity } from '../../../classes/entities/Meal';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Globals } from '../../../classes/Globals';
import { FilterItemsComponent } from '../../filter-items/filter-items.component';
import { orderMealsOptions } from '../../../assets/application-data.json';
import { CiudadRequestService } from '../../../services/ciudad-request.service';
import { firstValueFrom } from 'rxjs';
import { Validations } from '../../../classes/Validations';

@Component({
  selector: 'app-admin-city-meals',
  standalone: true,
  imports: [FormsModule, FilterItemsComponent],
  templateUrl: './admin-city-meals.component.html',
  styleUrl: '../admin-item.css'
})
export class AdminCityMealsComponent {
  applyFilter($event: void) {
    this.chargePage(this.page);
  }
  setSelectedOption($event: number) {
    this.orderBy = $event;
  }
  async chargePage(page: number = 0) {
    this.page = page;
    const res = await firstValueFrom(this.http.getUserCityMeals(page, this.orderOptions[this.orderBy]));
    if (res.ok) {
      this.meals = <MealEntity[]>res.body;
    }
  }
  chargeNextPage() {
    throw new Error('Method not implemented.');
  }
  pages(): any {
    return this.count === 0 ? 0 :
      this.getMaxPages();
  }
  chargePreviousPage() {
    throw new Error('Method not implemented.');
  }
  onClickEditMeal(meal: MealEntity) {
    this.onClickAddNewItem(meal)
  }
  async onSubmitMealData() {
    if (this.mealFieldsAreValid()) {
      const res: HttpResponse<MealEntity> = await firstValueFrom(this.http.postCityMeal(this.meal));
      if (res.ok) {
        this.meal = <MealEntity>res.body;
        let meal_index = this.meals.findIndex((m) => {
          return m.idPlatillo == this.meal.idPlatillo;
        });
        if(meal_index<0) this.meals = [this.meal, ...this.meals];
        else this.meals[meal_index] = this.meal;

        this.meal = this.cleanMeal();
      }
    }
  }
  onClickAddNewItem(meal?: MealEntity) {
    if (this.meal.nombre != null) {
      let confirmation = window.confirm("You have unsaved data. Continue without saving data?");
      if (!confirmation) return;
    }
    this.meal = Object.assign(this.meal, meal ? meal : this.cleanMeal());
    this.toogleMealForm(true)
  }
  constructor(private activatedRoute: ActivatedRoute, private elRef: ElementRef) {
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

  private cleanMeal() {
    return <MealEntity>{
      idPlatillo: null,
      idCiudad: null,
      nombre: null,
      descripcion: null
    }
  }

  private getMaxPages() {
    return Math.floor(this.count / this.limit) + (this.count % this.limit > 0 ? 1 : 0)
  }

  private toogleMealForm(show: boolean) {
    let form = document.getElementById('meal-form');
    form?.parentElement?.scrollIntoView()
    show ?
      form?.classList.add('show') :
      form?.classList.remove('show');
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
  orderBy: number = 0;

  meals: Array<MealEntity> = [];
  meal: MealEntity = this.cleanMeal();

  page: number = 0;
  count: number = 0;
  limit: number = 0;

  counter = Array;

  private http = inject(CiudadRequestService);

}
