import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { HttpRequestService } from '../../services/http-request.service';
import {  ActivatedRoute, Data, Router, RouterOutlet } from '@angular/router';
import { Globals } from '../../classes/Globals';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, RouterOutlet],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit{
  constructor(private router:Router){

  }
  
  ngOnInit(): void {
    if(Globals.isUserLogged===true) {
      switch (Globals.userType) {
        case 'C':
          this.router.navigate(['app/city'])
          break;
        case 'E':
            this.router.navigate(['app/business'])
            break;
        default:
          break;
      }
    }
    let pokeID = Math.floor(Math.random()*500);
                 //248 tiranitar;
                 //249 lugia 

    this.http.getPokeImage(pokeID.toString())
              .subscribe( result => {
                const response = JSON.parse(JSON.stringify(result));
                console.log(response);

                this.pokemonImageUrl = response.sprites.other.dream_world.front_default;
              })
  }

  pokemonImageUrl = null;
  isUserLoggedIn = false;
  private http = inject(HttpRequestService);

}
