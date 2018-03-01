import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';

import { PuzzleComponent } from './puzzle.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';
import { PuzzleResultsComponent } from './puzzle-results/puzzle-results.component';

const routes: Routes = [
  {
    path: 'puzzle',
    component: PuzzleComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PuzzleGameComponent
      },
      {
        path: 'results',
        component: PuzzleResultsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuzzleRoutingModule { }
