import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuzzleRoutingModule } from './puzzle-routing.module';
import { PuzzleComponent } from './puzzle.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';
import { PuzzleResultsComponent } from './puzzle-results/puzzle-results.component';


@NgModule({
  imports: [
    CommonModule,
    PuzzleRoutingModule
  ],
  declarations: [
    PuzzleComponent,
    PuzzleGameComponent,
    PuzzleResultsComponent,

  ]
})
export class PuzzleModule { }
