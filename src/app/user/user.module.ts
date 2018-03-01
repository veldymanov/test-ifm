import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserRegisterComponent
  ]
})
export class UserModule { }
