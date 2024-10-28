import { Component, Input } from '@angular/core';
import { PlaceEntity } from '../../../../classes/entities/Place';
import { FormsModule } from '@angular/forms';
import { tipoZona } from '../../../../assets/application-data.json'

@Component({
  selector: 'app-form-place',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-place.component.html'
})
export class FormPlaceComponent {

  @Input() item: PlaceEntity = <PlaceEntity>{};

  @Input() submitAction: any = {};

  readonly onSubmitPlaceData = () => this.submitAction();
  readonly tipoZona = tipoZona;
  
}
