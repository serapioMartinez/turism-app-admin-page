import { Component, Input } from '@angular/core';
import { CharacterEntity } from '../../../../classes/entities/Character';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-character',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-character.component.html',
  styles: ``
})
export class FormCharacterComponent {
  @Input() item: CharacterEntity = <CharacterEntity>{};

  @Input() submitAction: any = {};

  readonly onSubmitCharacterData = () => this.submitAction();
  // onSubmitCharacterData() {}
}
