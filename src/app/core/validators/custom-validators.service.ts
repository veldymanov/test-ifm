import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';


@Injectable()
export class CustomValidatorsService {

  constructor(private afs: AngularFirestore) { }

  confirmPassword(): ValidatorFn {
    return (control: AbstractControl): {[error: string]: boolean} | null => {
      const confirmPassword = control.value;
      const password = control.parent ? control.parent.get('password').value : '';

      return (password === confirmPassword) ? null : {'confirmPassword': true};
    };
  }

  checkConfirmPassword() {
    return (control: AbstractControl) => {
      const password = control;
      const confirmPassword = control.parent ? control.parent.get('confirmPassword') : null;

      if (confirmPassword) {
        if (password.value !== confirmPassword.value) {
          confirmPassword.setErrors({'confirmPassword': true});
        } else {
          confirmPassword.setErrors(null);
        }
      }
    };
  }

  forbiddenString(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[error: string]: boolean} | null => {
      const forbidden = nameRe.test(control.value);

      return forbidden ? {'forbiddenString': true} : null;
    };
  }

  customEmail(): ValidatorFn {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return (control: AbstractControl): {[error: string]: boolean} | null => {
      const allowed = EMAIL_REGEXP.test(control.value);

      return allowed ? null : {'customEmail': true};
    };
  }

  nameInDB(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[error: string]: boolean} | null> => {
      const username = control.value.trim(); // .toLowerCase();

      return this.afs.collection('users', ref => ref.where('displayName', '==', username)).valueChanges()
        .pipe(
          debounceTime(500),
          distinctUntilChanged(), // ignore if next search term is same as previous
        )
        .take(1) // make sure the Observable completes
        .map(arr => arr.length ? {'nameInDB': true} : null );
    };
  }

  emailInDB(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[error: string]: boolean} | null> => {
      const userEmail = control.value.trim();

      return this.afs.collection('users', ref => ref.where('email', '==', userEmail)).valueChanges()
        .pipe(
          debounceTime(500),
          distinctUntilChanged(), // ignore if next search term is same as previous
        )
        .take(1) // make sure the Observable completes
        .map(arr => arr.length ? null : {'emailInDB': true} );
    };
  }

  emailNotInDB(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[error: string]: boolean} | null> => {
      const userEmail = control.value.trim();

      return this.afs.collection('users', ref => ref.where('email', '==', userEmail)).valueChanges()
        .pipe(
          debounceTime(500),
          distinctUntilChanged(), // ignore if next search term is same as previous
        )
        .take(1) // make sure the Observable completes
        .map(arr => arr.length ? {'emailNotInDB': true} : null );
    };
  }
}
