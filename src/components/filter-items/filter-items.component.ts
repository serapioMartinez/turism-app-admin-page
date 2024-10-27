import { Component, Input, output } from '@angular/core';
import { OrderBy } from '../../classes/OrderBy';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-items',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-items.component.html',
  styles: ``
})
export class FilterItemsComponent {

  constructor(){
    console.log(this.orderOptions)
  }

  onSubmitFilter(){
    this.applyFilter.emit();
  }

  sendSelectedOption(){
    console.log("Sending value  to parent...")
    this.optionSelected.emit(this.orderBy);
  }

  @Input() orderOptions : Array<OrderBy> = [];

  optionSelected = output<number>();
  applyFilter = output<void>();
  orderBy: number = 0;
}
