import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router,ActivatedRoute, Data } from '@angular/router';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { Globals } from '../classes/Globals';
import { HttpRequestService } from '../services/http-request.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PrincipalPageComponent } from '../pages/principal-page/principal-page.component';
import { LoadingComponent } from '../components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PrincipalPageComponent, RouterOutlet, LoadingComponent],
  providers: [Globals],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor() {  }
  ngOnInit() {
    console.log('Init from Root')
  }

  getChargingFlag(){
    return Globals.isUserLogged;
  }

  readonly backgroundNames = ["bg-huautla.webp", "bg-capulalpam.jpg", "bg-hierve-del-agua.jpg", "bg-la-ventanilla.jpg", "bg-santuario.jpg"];
  backgoundImage = this.backgroundNames[Math.floor(Math.random()*5)];
  title = 'turism-app-admin-page';
  private http = inject(HttpRequestService);
}
