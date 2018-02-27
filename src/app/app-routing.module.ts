import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, PreloadAllModules  } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PazzleComponent } from './pazzle/pazzle.component';

const appRoutes: Routes = [
  { path: 'puzzle', component: PazzleComponent },
  { path: '', redirectTo: 'puzzle', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
    //    enableTracing: true, // <-- debugging purposes only
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
