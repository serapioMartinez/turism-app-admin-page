import { Router, Routes} from '@angular/router';
import { CityAdminPageComponent } from '../pages/city-admin-page/city-admin-page.component';
import { AuthPageComponent } from '../pages/auth-page/auth-page.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserAuthenticatedService } from '../services/user-authenticated.service';
import { AppComponent } from './app.component';
import { PrincipalPageComponent } from '../pages/principal-page/principal-page.component';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';
import { GetUserCityService } from '../services/get-user-city.service';
import { AdminCityComponent } from '../components/city/admin-city/admin-city.component';
import { AdminCityCharactersComponent } from '../components/city/characters/admin-city-characters/admin-city-characters.component';
import { AdminCityMealsComponent } from '../components/city/meals/admin-city-meals/admin-city-meals.component';
import { AdminCityEstablishmentsComponent } from '../components/city/admin-city-establishments/admin-city-establishments.component';
import { GetCityCharactersService } from '../services/get-city-characters.service';
import { GetCityMealsService } from '../services/get-city-meals.service';
import { AdminCityPlacesComponent } from '../components/city/places/admin-city-places/admin-city-places.component';
import { GetCityPlacesService } from '../services/get-city-places.service';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: AppComponent,
    //     //canActivate: [() => new Router().parseUrl('app/auth/login')],
    //     pathMatch: 'full'
    // },
    {
        path: 'app',
        component: PrincipalPageComponent,
        resolve: {
            loggedUser: UserAuthenticatedService
        },
        children: [
            {
                path: 'auth',
                component: AuthPageComponent,
                resolve: {
                    loggedUser: UserAuthenticatedService
                },
                children: [
                    {
                        path: 'login',
                        component: LoginFormComponent
                    },
                    {
                        path: 'register',
                        component: RegisterComponent
                    }
                ]
            },
            {
                path: 'city',
                component: CityAdminPageComponent,
                children:[
                    {
                        path: '',
                        component: AdminCityComponent,
                        resolve: {
                            userCity: GetUserCityService
                        }
                    },{
                        path: 'characters',
                        component: AdminCityCharactersComponent,
                        resolve: {
                            userCityCharacters: GetCityCharactersService
                        }
                    },{
                        path: 'meals',
                        component: AdminCityMealsComponent,
                        resolve:{
                            userCityMeals: GetCityMealsService
                        }
                    },{
                        path: 'places',
                        component: AdminCityPlacesComponent,
                        resolve:{
                            cityPlaces: GetCityPlacesService
                        }
                    },{
                        path: 'establishments',
                        component: AdminCityEstablishmentsComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'error',
        component: ErrorPageComponent
    },
    {
        path: '**',
        redirectTo: 'app/auth/login'
    }
];
