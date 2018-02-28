import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle',
  styles: [`
    h2 {
      text-align: center;
    }
  `],
  template: `
    <router-outlet></router-outlet>
  `
})
export class PuzzleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
