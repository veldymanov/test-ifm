import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuzzleRoutingModule } from './puzzle-routing.module';
import { PuzzleComponent } from './puzzle.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';


@NgModule({
  imports: [
    CommonModule,
    PuzzleRoutingModule
  ],
  declarations: [
    PuzzleComponent,
    PuzzleGameComponent,

  ]
})
export class PuzzleModule { }
