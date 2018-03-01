import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, AuthError } from '../../core/auth/auth.service';
import { CustomValidatorsService } from '../../core/validators/custom-validators.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  isNewUser: boolean;
  loginWithEmail = false;
  // resetPassword = false;
  error: AuthError;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
    this.authService.isNewUser$.subscribe((reg: boolean) => this.isNewUser = reg);
    this.checkUserInfo();
  }

  // getters for cleaner HTML code
  get email() { return this.loginForm.get('loginEmail'); }
  get password() { return this.loginForm.get('loginPassword'); }

  createForm(): void {
    this.loginForm = this.fb.group({
      loginEmail: ['',
        [
          Validators.required,
          Validators.email,
        ],
        this.customValidators.emailInDB()
      ],
      loginPassword: ['',
        [
          Validators.required,
          Validators.minLength(6),
          this.customValidators.forbiddenString(/bobbob/i)
        ]
      ]
    });
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      // this.router.navigate(['/profile']);
    }
  }
/*
  onLoginGoogle(): void {
    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigate(['../profile'], { relativeTo: this.route });
      })
      .catch((error: AuthError) => {
        this.error = error;
        this.router.navigate(['/']);
      });
  }

  loginWithEmailForm(): void {
    this.loginWithEmail = !this.loginWithEmail;
    if ( this.isNewUser ) { this.router.navigate(['./register'], { relativeTo: this.route }); }
  }
*/
  toRegisterEmailForm(): void {
    this.authService.isNewUser$.next(true);
    this.router.navigate(['./register'], { relativeTo: this.route });
  }

  onLoginEmail(): void {
    this.authService.loginWithEmail(this.email.value, this.password.value)
      .then(() => {
        this.router.navigate(['../puzzle'], { relativeTo: this.route });
      })
      .catch((error: AuthError) => {
        this.error = error;
        this.router.navigate(['/']);
      });
  }
/*
  sendResetEmail(): void {
    this.authService.resetPassword(this.email.value)
      .then(() => this.resetPassword = true)
      .catch((error: AuthError) => {
        this.error = error;
      });
  }
*/
}
