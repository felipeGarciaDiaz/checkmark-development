// client/src/app/components/home/home.component.ts
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../_services/config.service';
import { QuizConfig } from '../../_models/quiz';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private router = inject(Router);
  private configSvc = inject(ConfigService);

  config = signal<QuizConfig | null>(null);

  async ngOnInit() {
    this.config.set(await this.configSvc.load());
    const theme = this.config()!.theme;
    document.body.style.backgroundImage = `url(${theme.backgroundImage})`;
    document.body.style.fontFamily = theme.fontFamily;
    document.body.style.fontSize = theme.fontSize;
  }

  startQuiz() {
    this.router.navigate(['/quiz']);
  }
}
