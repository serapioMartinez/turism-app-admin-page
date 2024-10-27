import { Component, Input } from '@angular/core';
import { CharacterEntity } from '../../../../classes/entities/Character';

@Component({
  selector: 'app-character-row',
  standalone: true,
  imports: [],
  templateUrl: './character-row.component.html',
  styles: ``
})
export class CharacterRowComponent {
  @Input() character: CharacterEntity = <CharacterEntity>{};
  @Input() onClickEditItem: any = () =>{};
}
