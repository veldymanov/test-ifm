import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad,
  Route, Router,
  ActivatedRouteSnapshot,  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import 'rxjs/add/operator/do';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if ( this.authService.isUserEmailLoggedIn ) { return true; }

      return this.authService.authState$
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['/login']);
          }
        });
    }

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | boolean {
      return true;
  }

  canLoad(route: Route): boolean {
    return true;
  }
}
