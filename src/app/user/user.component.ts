import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  styles: [`
    h2 {
      color: #369;
    }
  `],
  template: `
    <router-outlet></router-outlet>
  `
})
export class UserComponent implements OnInit {

  private userLogin = false;

  constructor() {}

  ngOnInit() {

  }
}
