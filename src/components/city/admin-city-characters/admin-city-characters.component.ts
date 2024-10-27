import { Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CharacterEntity } from '../../../classes/entities/Character';
import { Globals } from '../../../classes/Globals';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CiudadRequestService } from '../../../services/ciudad-request.service';
import { firstValueFrom } from 'rxjs';
import { Validations } from '../../../classes/Validations';
import { orderCharactersOptions } from '../../../assets/application-data.json';
import { FilterItemsComponent } from '../../filter-items/filter-items.component';

@Component({
  selector: 'app-admin-city-characters',
  standalone: true,
  imports: [FormsModule, FilterItemsComponent],
  templateUrl: './admin-city-characters.component.html',
  styleUrl: '../admin-item.css'
})
export class AdminCityCharactersComponent {

  constructor(private activatedRoute: ActivatedRoute, private elRef: ElementRef) {

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

  async onSubmitCharacterData() {
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
        this.character = this.cleanCharacter();

      }
    } catch (err) {
      window.alert(err)
    }
  }

  onClickAddNewItem(event: Event) {
    if (this.character.idPersonaje != null) {
      let res = window.confirm("You have unsaved data in Form. \nAre you sure to continue without saving data? ")
      if (!res) {
        event.preventDefault();
        event.stopPropagation();
        return
      }
    }
    this.showCharacterForm()
  }

  onClickEditCharacter(character: CharacterEntity) {
    if (this.character.nombre) {
      let confirmation = window.confirm("You have unsaved data. Continue without saving?")
      if (!confirmation) return;
    }

    Object.assign(this.character, character);
    this.showCharacterForm();

  }

  showCharacterForm() {
    let form = document.getElementById('character-form');
    form?.classList.add('show');
    form?.parentElement?.scrollIntoView();
  }

  pages() {
    return this.count === 0 ? 0 :
      this.getMaxPages();
  }

  setPreviousPage() {

    let link = document.getElementById('previous-page-link');
    if (this.page == 0 || this.page == 1) {
      link?.classList.add('disabled')
      return '';
    } else {
      link?.classList.remove('disabled');
      return (this.page - 1).toString();
    }
  }

  setNextPage() {

    let link = document.getElementById('next-page-link');
    if (this.page == 0 || this.page == this.getMaxPages()) {
      link?.classList.add('disabled')
      return '';
    } else {
      link?.classList.remove('disabled');
      return (this.page + 1).toString();
    }
  }

  async chargePreviousPage() {
    if (this.page > 1) this.chargePage(--this.page);
  }

  async chargeNextPage() {
    if (this.page < this.getMaxPages()) this.chargePage(++this.page);
  }

  async chargePage(page: number) {
    this.page = page;
    const res = await firstValueFrom(
      this.http.getUserCityCharacters(page, this.orderOptions[this.selectedFilterOption])
    );
    if (res.ok) {
      this.characters = <CharacterEntity[]>res.body;
    }
  }

  async applyFilter($event: void) {
    this.chargePage(1);
  }

  private cleanCharacter(): CharacterEntity {
    return {
      idPersonaje: null,
      idCiudad: null,
      anhoFallecimiento: null,
      anhoNacimiento: null,
      descripcion: null,
      imagen: null,
      nombre: null
    }
  }

  private characterFieldsAreValid() {
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

  private getMaxPages() {
    return Math.floor(this.count / this.limit) + (this.count % this.limit > 0 ? 1 : 0)
  }

  setFilterOptionSelected($event: number) {
    this.selectedFilterOption = $event;
  }
  counter = Array;
  characters: Array<CharacterEntity> = [];
  character: CharacterEntity = this.cleanCharacter();
  totalPages: number | null = null;
  count: number = 0;
  page: number = 0
  limit: number = 0;

  orderOptions = orderCharactersOptions;
  selectedFilterOption: number = 0;
  readonly http = inject(CiudadRequestService);
}


