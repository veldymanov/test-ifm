import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { AuthService, User } from '../../core/auth/auth.service';
import { PuzzleService } from '../../core/puzzle/puzzle.service';

@Component({
  selector: 'app-puzzle-results',
  templateUrl: './puzzle-results.component.html',
  styleUrls: ['./puzzle-results.component.scss']
})
export class PuzzleResultsComponent implements OnInit {

  private users$: AngularFirestoreCollection<User>;
  users: User[];
  userPuzzleScore: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService,
    private puzzleService: PuzzleService
  ) {}

  ngOnInit() {
    this.users$ = this.afs.collection('users',
                    ref => ref.where('puzzleGameScore', '>', 0).orderBy('puzzleGameScore').limit(10));
    this.users$.valueChanges().subscribe( (users: User[]) => { this.users = users; });

    this.userPuzzleScore = this.puzzleService.userScore;
  }

  startGame() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
