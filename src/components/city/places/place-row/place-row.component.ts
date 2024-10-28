import { Component, Input, OnInit } from '@angular/core';
import { PlaceEntity } from '../../../../classes/entities/Place';
import { tipoZona } from '../../../../assets/application-data.json'

@Component({
  selector: 'app-place-row',
  standalone: true,
  imports: [],
  templateUrl: './place-row.component.html',
  styleUrl: '../../row-style.css'
})
export class PlaceRowComponent{

  readonly mapZonas = this.createMap();
  
  private createMap(){
    let map = new Map();
    tipoZona.forEach((tipo) => {
      map.set(tipo.tipo, tipo.descripcion);
    })

    return map;
  }
  @Input() item: PlaceEntity = <PlaceEntity>{};
  @Input() onClickEditItem: any = () =>{};
}
