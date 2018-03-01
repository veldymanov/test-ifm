import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    h1 {
      margin: 10px 0;
      text-align: center;
    }
    nav {
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: center;
      padding-bottom: 15px;
    }
  `],
  template: `
    <h1> Puzzle Game </h1>
    <nav>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/puzzle" routerLinkActive="active">Game</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Angular Modules';
}
