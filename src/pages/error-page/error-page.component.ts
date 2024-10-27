import { Component, inject, untracked } from '@angular/core';
import { ErrorProviderService } from '../../services/error-provider.service';
import { Globals } from '../../classes/Globals';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './error-page.component.html',
  styles: `
  .banner{
    padding: 1rem;
    border-radius: 0.3rem;
    background-color: rgba(244, 150, 158, 0.9)
  }
  `
})
export class ErrorPageComponent {

  constructor(){
    Globals.isUserLogged = false;
  }

  error = inject(ErrorProviderService);
}
