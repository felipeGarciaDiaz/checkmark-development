// client/src/app/components/result/result.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  score = 0;
  wrong = 0;
  total = 0;
  percentage = 0;
  pass = false;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state: any = nav?.extras.state;
    if (state) {
      this.score = state.score;
      this.wrong = state.wrong;
      this.total = state.total;
      this.percentage = Math.round((this.score / this.total) * 100);
      this.pass = this.percentage >= 60;
    }
  }

  restart() {
    this.router.navigate(['/']);
  }
}
