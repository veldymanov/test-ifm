import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad,
  Route, Router,
  ActivatedRouteSnapshot,  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if ( !this.authService.isUserEmailLoggedIn ) {
        console.log('access denied');
        this.router.navigate(['/login']);
      }

      return this.authService.isUserEmailLoggedIn;
    }

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | boolean {
      return true;
  }

  canLoad(route: Route): boolean {
    return true;
  }
}
