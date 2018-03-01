import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { CustomValidatorsService } from './validators/custom-validators.service';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFirestoreModule.enablePersistence(), // For Offline Data
  ],
  declarations: [
    PageNotFoundComponent,
   ],
  providers: [
    AuthGuard,
    AuthService,
    CustomValidatorsService,
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
