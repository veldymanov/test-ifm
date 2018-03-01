import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, AuthError } from '../../core/auth/auth.service';
import { CustomValidatorsService } from '../../core/validators/custom-validators.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  private error: AuthError;
  private uid = this.authService.currentUserId;
  registerForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    public authService: AuthService) {}

  ngOnInit() {
    this.createForm();
  }

  get username() { return this.registerForm.get('userName'); }
  get email() { return this.registerForm.get('email'); }
  get pass() { return this.registerForm.get('password'); }
  get confPass() { return this.registerForm.get('confirmPassword'); }

  createForm(): void {
    this.registerForm = this.fb.group({
      userName: ['',
        [Validators.required],
        this.customValidators.nameInDB()
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,
        ],
        this.customValidators.emailNotInDB()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          this.customValidators.checkConfirmPassword()
        ]
      ],
      confirmPassword: ['', this.customValidators.confirmPassword()]
    });
  }

  onSignUp(): void {
    this.authService.signUpWithEmail(this.email.value, this.pass.value, this.username.value)
      .then(() => {
        this.authService.isNewUser$.next(false);
        this.router.navigate(['../../puzzle'], { relativeTo: this.route });
      }).catch(error => {
        this.error = error;
        this.router.navigate(['/']);
      });
  }

  toLoginWithEmailForm(): void {
    this.authService.isNewUser$.next(false);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
