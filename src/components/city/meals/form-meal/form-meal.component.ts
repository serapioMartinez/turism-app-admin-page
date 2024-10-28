import { Component, Input } from '@angular/core';
import { MealEntity } from '../../../../classes/entities/Meal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-meal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-meal.component.html',
  styles: ``
})
export class FormMealComponent {
  @Input() item: MealEntity = <MealEntity> {};
  @Input() onSubmitMealData: any = () => {};
}
