// client/src/app/components/quiz/quiz.component.ts
import { Component, inject, signal } from '@angular/core';
import { ConfigService } from '../../_services/config.service';
import { QuizConfig } from '../../_models/quiz';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
        animate('500ms cubic-bezier(.68,-0.55,.27,1.55)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(.68,-0.55,.27,1.55)', style({ opacity: 0, transform: 'translateY(-40px) scale(0.95)' }))
      ])
    ])
  ]
})
export class QuizComponent {
  private configSvc: any = inject(ConfigService);
  private router = inject(Router);

  config = signal<QuizConfig | null>(null);
  current = signal(0);
  selected = signal<string | null>(null);
  score = signal(0);
  wrong = signal(0);
  finished = signal(false);

  showFeedback = false;
  lastCorrect = false;

  async ngOnInit() {
    const cfg = await this.configSvc.load();
    this.config.set(cfg);
  }

  choose(label: string) {
    if (this.selected()) return;
    this.selected.set(label);
    const cfg = this.config()!;
    const q = cfg.questions[this.current()];
    this.lastCorrect = label === q.answers.find(a => a.isCorrect)?.text;
    this.showFeedback = true;

    if (cfg.settings.showCorrectAnswers) {
      if (this.lastCorrect) this.score.set(this.score() + 1);
      else this.wrong.set(this.wrong() + 1);
    }

    setTimeout(() => {
      this.showFeedback = false;
      this.next();
    }, 1100); // Show feedback for 1.1s before next question
  }

  next() {
    const cfg = this.config()!;
    const q = cfg.questions[this.current()];
    if (!cfg.settings.showCorrectAnswers && this.selected()) {
      if (this.selected() === q.answers.find(a => a.isCorrect)?.text) this.score.set(this.score() + 1);
      else this.wrong.set(this.wrong() + 1);
    }
    if (this.current() + 1 < cfg.questions.length) {
      this.current.set(this.current() + 1);
      this.selected.set(null);
    } else {
      this.finished.set(true);
      this.router.navigate(['/result'], {
        state: { score: this.score(), wrong: this.wrong(), total: cfg.questions.length }
      });
    }
  }
}
