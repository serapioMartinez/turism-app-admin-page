import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class EmptyPathsGuard implements CanActivate{

    constructor(private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardResult {
        
            //this.router.navigate(['app/auth/login'])
        return    this.router.parseUrl('/app/auth/login')
        //return false;
    }

}