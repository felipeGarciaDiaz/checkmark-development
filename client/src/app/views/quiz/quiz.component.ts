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
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
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

  async ngOnInit() {
    const cfg = await this.configSvc.load();
    this.config.set(cfg);
  }

  choose(label: string) {
    if (this.selected()) return;
    this.selected.set(label);
    const cfg = this.config()!;
    const q = cfg.questions[this.current()];
    if (cfg.settings.showImmediateFeedback) {
      if (label === q.correct) this.score.set(this.score() + 1);
      else this.wrong.set(this.wrong() + 1);
    }
    setTimeout(() => this.next(), cfg.settings.transitionTime);
  }

  next() {
    const cfg = this.config()!;
    const q = cfg.questions[this.current()];
    if (!cfg.settings.showImmediateFeedback && this.selected()) {
      if (this.selected() === q.correct) this.score.set(this.score() + 1);
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
