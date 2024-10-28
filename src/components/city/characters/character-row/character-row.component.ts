import { Component, Input } from '@angular/core';
import { CharacterEntity } from '../../../../classes/entities/Character';

@Component({
  selector: 'app-character-row',
  standalone: true,
  imports: [],
  templateUrl: './character-row.component.html',
  styleUrl: '../../row-style.css'
})
export class CharacterRowComponent {
  @Input() item: CharacterEntity = <CharacterEntity>{};
  @Input() onClickEditItem: any = () =>{};
}
