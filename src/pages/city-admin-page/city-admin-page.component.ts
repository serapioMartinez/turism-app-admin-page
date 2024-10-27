import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CityAdminHeaderComponent } from '../../components/header/city-admin-header/city-admin-header.component';
import { Globals } from '../../classes/Globals';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-city-admin-page',
  standalone: true,
  imports: [CityAdminHeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './city-admin-page.component.html',
  styles: ``
})
export class CityAdminPageComponent implements OnInit{
  constructor(private router:Router){

  }
  ngOnInit(): void {
    if(!Globals.isUserLogged) this.router.navigate(['app/auth/login'])
  }
}
