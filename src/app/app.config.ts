import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { HttpRequestService } from '../services/http-request.service';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '../classes/LoginResponse';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withJsonpSupport()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    }
  ]
};

export function initializeApp(){
  return () => {
    console.log('App Initializer')
  }
}

