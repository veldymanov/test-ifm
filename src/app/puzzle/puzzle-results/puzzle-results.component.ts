import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { AuthService, User } from '../../core/auth/auth.service';

@Component({
  selector: 'app-puzzle-results',
  templateUrl: './puzzle-results.component.html',
  styleUrls: ['./puzzle-results.component.scss']
})
export class PuzzleResultsComponent implements OnInit {

  private user$: AngularFirestoreDocument<User>;
  private users$: AngularFirestoreCollection<User>;
  user: User;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.afs.doc(`users/${this.authService.currentUserId}`);
    this.users$ = this.afs.collection('users', ref => ref.orderBy('puzzleGameScore').limit(10));

    this.user$.valueChanges().subscribe( (user: User) => { this.user = user; });
    this.users$.valueChanges().subscribe( (users: User[]) => { this.users = users; });
  }

  startGame() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
