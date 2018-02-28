import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, PreloadAllModules  } from '@angular/router';

import { PuzzleModule } from './puzzle/puzzle.module';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'puzzle', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    PuzzleModule,
    RouterModule.forRoot(
      appRoutes,
      {
        //  enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules // SelectivePreloadingStrategy
      }
    )
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
