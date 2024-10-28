import { Component, Input } from '@angular/core';
import { MealEntity } from '../../../../classes/entities/Meal';

@Component({
  selector: 'app-meal-row',
  standalone: true,
  imports: [],
  templateUrl: './meal-row.component.html',
  styleUrl: '../../row-style.css'
})
export class MealRowComponent {
  @Input() item: MealEntity = <MealEntity>{};
  @Input() onClickEditMeal: any = () =>{};
}
