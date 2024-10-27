import { Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CharacterEntity } from '../../../../classes/entities/Character';
import { Globals } from '../../../../classes/Globals';
import { HttpHeaders } from '@angular/common/http';
import { CiudadRequestService } from '../../../../services/ciudad-request.service';
import { firstValueFrom } from 'rxjs';
import { Validations } from '../../../../classes/Validations';
import { orderCharactersOptions } from '../../../../assets/application-data.json';
import { AdminCityItemComponent } from '../../admin-city-item/admin-city-item.component';
import { AbstractAdminCityItems } from '../../admin-city-item/abs-admin-city-item';
import { CharacterRowComponent } from '../character-row/character-row.component';
import { FormCharacterComponent } from '../form-character/form-character.component';

@Component({
  selector: 'app-admin-city-characters',
  standalone: true,
  imports: [AdminCityItemComponent],
  templateUrl: './admin-city-characters.component.html'
})
export class AdminCityCharactersComponent extends AbstractAdminCityItems {

  constructor(private http: CiudadRequestService, private activatedRoute: ActivatedRoute, private elRef: ElementRef) {
    super();
    console.log("Initializing Characters Constructor");

    elRef.nativeElement.className = 'flex-fill'

    activatedRoute.data.subscribe({
      next: (data: Data) => {
        const res = data['userCityCharacters'];
        res.headers.keys()
        const headers: HttpHeaders = res.headers;
        this.count = Number.parseInt(headers.get(Globals.paginationHeaderes.count) ?? '0');
        this.page = (this.count == 0) ? 0 : Number.parseInt(headers.get(Globals.paginationHeaderes.page) ?? '0');
        this.limit = Number.parseInt(headers.get(Globals.paginationHeaderes.limit) ?? '0');

        this.characters = res.body;
      }
    })

    console.log("Finishing Characters Constructor")
  }
  async onSubmitItemData(): Promise<void> {
    try {
      if (!this.characterFieldsAreValid()) throw Error("Field Validation Error. Please revise your input data")
      const res = await firstValueFrom(this.http.postUserCityCharacter(this.character));
      if (res.ok) {
        let newCharacter = <CharacterEntity>res.body;
        let chr_index = this.characters.findIndex((chr) => {
          return chr.idPersonaje == newCharacter.idPersonaje ? true : false;
        });
        if (chr_index < 0) this.characters = [newCharacter, ...this.characters];
        else this.characters[chr_index] = newCharacter;
        this.character = <CharacterEntity>{};

      }
    } catch (err) {
      window.alert(err)
    }
  }

  provideItemRow() {
    return CharacterRowComponent;
  }

  provideRowInputs(item: CharacterEntity) {
    return {
      "character": item,
      "onClickEditItem": () => this.onClickEditItem(item)
    }
  }

  provideFormType() {
    throw FormCharacterComponent;
  }
  
  provideFormInputs() {
    return {
      "character": this.character,
      "submitAction": () => this.onSubmitItemData()
    }
  }

  onClickAddNewItem(item: CharacterEntity): void {
    if (this.character.nombre != null) {
      let confirmation = window.confirm("You have unsaved data. Continue without saving data?");
      if (!confirmation) return;
    }
    Object.assign(this.character, item ? item : <CharacterEntity>{});
    this.toogleForm(true);
  }

  async chargePage(page: number): Promise<void>{
    this.page = page;
    const res = await firstValueFrom(
      this.http.getUserCityCharacters(page, this.orderOptions[this.selectedOption])
    );
    if (res.ok) {
      this.characters = <CharacterEntity[]>res.body;
    }
  }

  private characterFieldsAreValid():boolean{
    let result = true;
    let input = <HTMLInputElement>document.getElementById("name");
    Validations.validateText(input) ? 1 == 1 : result = false;

    input = <HTMLInputElement>document.getElementById("desc");
    Validations.validateText(input) ? 1 == 1 : result = false;

    input = <HTMLInputElement>document.getElementById("birth");
    input.value != "" ?
      (Validations.validateYear(input) ? 1 == 1 : result = false) :
      1 == 1;

    input = <HTMLInputElement>document.getElementById("death");
    input.value != "" ?
      (Validations.validateYear(input)) ? 1 == 1 : result = false :
      1 == 1;
    return result;
  }

  characters: Array<CharacterEntity> = [];
  character: CharacterEntity = <CharacterEntity>{};

  orderOptions = orderCharactersOptions;
}


