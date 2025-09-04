import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  public joinCode: string = '';
  quizForm!: FormGroup;
  lastGameId: string | null = null;
  lastGameCode: string | null = null;

  ngOnInit() {
    // Always initialize with an empty config so the form appears
    this.buildForm({
      title: '',
      theme: {},
      settings: {},
      questions: []
    });
  }

  async loadDefaultConfig() {
    const config: any = await firstValueFrom(this.http.get('/assets/config.json'));
    this.buildForm(config);
  }

  async importDefaultConfig() {
    await this.loadDefaultConfig();
  }

  buildForm(config: any) {
    this.quizForm = this.fb.group({
      title: [config.title || '', Validators.required],
      theme: this.fb.group({
        backgroundImage: [config.theme?.backgroundImage || ''],
        primaryColor: [config.theme?.primaryColor || ''],
        secondaryColor: [config.theme?.secondaryColor || ''],
        textColor: [config.theme?.textColor || ''],
        buttonColor: [config.theme?.buttonColor || ''],
        hoverColor: [config.theme?.hoverColor || ''],
        fontFamily: [config.theme?.fontFamily || ''],
        fontSize: [config.theme?.fontSize || '']
      }),
      settings: this.fb.group({
        showImmediateFeedback: [config.settings?.showImmediateFeedback ?? true],
        transitionTime: [config.settings?.transitionTime ?? 600],
        passPercentage: [config.settings?.passPercentage ?? 60]
      }),
      questions: this.fb.array(
        (config.questions || []).map((q: any) =>
          this.fb.group({
            prompt: [q.prompt, Validators.required],
            image: [q.image || ''],
            answers: this.fb.group({
              A: [q.answers?.A || '', Validators.required],
              B: [q.answers?.B || '', Validators.required],
              C: [q.answers?.C || '', Validators.required],
              D: [q.answers?.D || '', Validators.required]
            }),
            correct: [q.correct, Validators.required]
          })
        )
      )
    });
  }

  get questions(): FormArray {
    return this.quizForm?.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(
      this.fb.group({
        prompt: ['', Validators.required],
        image: [''],
        answers: this.fb.group({
          A: ['', Validators.required],
          B: ['', Validators.required],
          C: ['', Validators.required],
          D: ['', Validators.required]
        }),
        correct: ['', Validators.required]
      })
    );
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  async submitQuizForm() {
    if (this.quizForm.invalid) return;
    const config = this.quizForm.value;
    const res: any = await firstValueFrom(this.http.post('http://localhost:4000/api/games', { config }));
    if (res && res.gameId && res.code) {
      this.lastGameId = res.gameId;
      this.lastGameCode = res.code;
      this.router.navigate(['/room', res.gameId]);
    }
  }

  // For file upload
  triggerFileInput() {
    const input = document.getElementById('configFile') as HTMLInputElement;
    if (input) input.click();
  }

  onConfigFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const config = JSON.parse(reader.result as string);
        this.buildForm(config);
      } catch (e) {
        alert('Invalid config file.');
      }
    };
    reader.readAsText(file);
  }

  async onJoinQuizWithActiveConfig() {
    if (!this.joinCode) {
      alert('Please enter a room code.');
      return;
    }
    this.router.navigate(['/quiz'], { queryParams: { code: this.joinCode } });
  }
}
