import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Data, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Globals } from '../../classes/Globals';

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [RouterOutlet],
  template: ` 
    @if(showRouterOutlet() != undefined){
      <router-outlet></router-outlet>
    }
  `,
  styles: ``
})
export class PrincipalPageComponent implements OnInit{

  constructor(private activateRouted: ActivatedRoute){}

  ngOnInit(): void {
    console.log('Init from Principal!')
  }

  showRouterOutlet(){
    return Globals.isUserLogged;
  }

}
