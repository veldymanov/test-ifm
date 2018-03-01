import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';


export interface User {
  uid: string;
  email: string;
  puzzleGameScore: number;
  photoURL?: string;
  displayName?: string;
  favouriteColor?: string;
}

export interface AuthError {
  code: string;
  message: string;
}


@Injectable()
export class AuthService {

//  user$: Observable<User>;
  authState$: Observable<any>;
  authState: firebase.User = null;
  isNewUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.authState$ = this.afAuth.authState;
    this.authState$.subscribe(auth => {
      this.authState = auth;
    });
  }

  get isUserAnonymousLoggedIn(): boolean { return (this.authState !== null) ? this.authState.isAnonymous : false; }
  get currentUserId(): string { return (this.authState !== null) ? this.authState.uid : ''; }
  get currentUserName(): string { return (this.authState !== null) ? this.authState['displayName'] : ''; }
  get currentUserEmail(): string {  return (this.authState !== null) ? this.authState['email'] : ''; }
  get currentUser(): firebase.User { return (this.authState !== null) ? this.authState : null; }
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

  loginWithGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return  this.afAuth.auth.signInWithPopup(provider)
      .then(auth => {
        console.log('Firebase Logged In With Google');
        this.updateUserData(auth.user);
      })
      .catch((error: firebase.FirebaseError) => {
        console.log(error);
        throw error;
      });
  }

  signUpWithEmail(
    email: string, password: string, username: string = '', photo: string = ''
  ): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(auth => auth.updateProfile(
        { displayName: username, photoURL: photo }
      ))
      .then(() => this.afAuth.auth.currentUser)
      .then(auth => {
        console.log('Firebase Registered With Email');
        this.updateUserData(auth);
        this.isNewUser$.next(false);
      })
      .catch((error: firebase.FirebaseError) => {
        console.log(error);
        throw error;
      });
  }

  loginWithEmail(email: string, password: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log('Firebase Logged In With Email');
        this.updateUserData(auth);
      })
      .catch((error: firebase.FirebaseError) => {
        console.log(error);
        throw error;
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('Firebase Signed Out');
        this.router.navigate(['/login']);
      })
      .catch((error: firebase.FirebaseError) => {
        console.log(error);
        throw error;
      });
  }

  resetPassword(email: string): Promise<void> {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('Firebase Email Sent'))
      .catch((error: firebase.FirebaseError) => {
        console.log(error);
        throw error;
      });
  }

  private updateUserData(user): void {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      puzzleGameScore: 0
    };

    userRef.valueChanges().take(1)
      .subscribe( doc => {
        if (!doc) {
          userRef.set(data) // userRef.update(data)
            .then(() => console.log('Firebase user data set'))
            .catch((error: firebase.FirebaseError) => {
              console.log('Firebase user data set error', error);
            });
        }
      });
  }
}
