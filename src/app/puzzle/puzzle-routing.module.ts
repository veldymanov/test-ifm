import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuzzleComponent } from './puzzle.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';

const routes: Routes = [
  {
    path: 'puzzle',
    component: PuzzleComponent,
    children: [
      {
        path: '',
        component: PuzzleGameComponent,
      //  canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuzzleRoutingModule { }
