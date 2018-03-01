import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-puzzle-results',
  templateUrl: './puzzle-results.component.html',
  styleUrls: ['./puzzle-results.component.scss']
})
export class PuzzleResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  startGame() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
