import { Component } from '@angular/core';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  styles: [`
    .header {
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-around;
    }
    h1 {
      margin: 10px 0;
      text-align: center;
    }
    nav {
      align-items: center;
      display: flex;
      justify-content: center;
      padding-bottom: 15px;
    }
    nav a {
      height: 20px;
    }
  `],
  template: `
    <div class="header">
      <h1> Puzzle Game </h1>
      <nav>
        <a (click)="toLogin();" routerLink="./login" routerLinkActive="active">Login</a>
        <a routerLink="./puzzle" routerLinkActive="active">Game</a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor( public authService: AuthService ) {}

  toLogin() {
    this.authService.isNewUser$.next(false);
  }
}
