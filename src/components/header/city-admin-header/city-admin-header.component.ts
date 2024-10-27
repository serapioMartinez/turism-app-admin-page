import { Component } from '@angular/core';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { Globals } from '../../../classes/Globals';
import { RouterLink } from '@angular/router';
import { OaxacaLogoComponent } from '../oaxaca-logo/oaxaca-logo.component';

@Component({
  selector: 'turism-city-admin-header',
  standalone: true,
  imports: [ProfileHeaderComponent, RouterLink, OaxacaLogoComponent],
  templateUrl: './city-admin-header.component.html',
  styleUrl: './city-admin-header.component.css'
})
export class CityAdminHeaderComponent {
  islogged(){
    return Globals.isUserLogged
  }
}
