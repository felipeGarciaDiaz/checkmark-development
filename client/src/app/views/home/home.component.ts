import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, Form } from '@angular/forms';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(.2,.9,.25,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('hoverEffect', [
      transition(':enter', [
        style({ transform: 'scale(1)', boxShadow: 'none' }),
        animate('200ms ease-in', style({ transform: 'scale(1.02)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'scale(1)', boxShadow: 'none' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(public fb: FormBuilder, public api: ApiService) {};
  quizForm!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.quizForm = this.fb.group({
      meta: this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        theme: this.fb.group({
          primaryColor: ['#1e93ab'],
          secondaryColor: ['#7ed6df'],
          font: ['Poppins, sans-serif'],
          backgroundColor: ['#f6fafd']
        })
      }),
      settings: this.fb.group({
        timeLimit: [0, [Validators.min(0), Validators.pattern(/^\d+$/)]], // Ensure number
        passPercentage: [50, [Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)]],
        shuffleQuestions: [true],
        allowBackNavigation: [false],
        maxAttempts: [3, [Validators.min(1), Validators.pattern(/^\d+$/)]],
        showCorrectAnswers: [true],
        enableLeaderboard: [true],
        allowSkips: [false],
        questionTimer: [false],
        randomizeOptions: [true],
        showProgressBar: [true]
      }),
      questions: this.fb.array([this.createQuestion()])
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  createQuestion(): AbstractControl<any, any> {
    return this.fb.group({
      type: ['multiple-choice', Validators.required],
      prompt: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
      answers: this.fb.array([
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer()
      ])
    }) ;
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  submitQuiz() {
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
      alert('Please fill in all required fields correctly.');
      return;
    }
    const quizData = this.quizForm.value;
    const config = {
      title: quizData.meta.title,
      description: quizData.meta.description,
      theme: {
        ...quizData.meta.theme,
        backgroundColor: [quizData.meta.theme.backgroundColor],
        font: quizData.meta.theme.font.split(', ') as [string, string],
      },
      settings: quizData.settings,
      questions: quizData.questions,
    };
    this.api.createGame(config).subscribe(
      (response) => {
        console.log('Quiz created successfully:', response);
        alert('Quiz created successfully!');
      },
      (error) => {
        console.error('Error creating quiz:', error);
        alert('Error creating quiz. Please try again.');
      }
    );
  }
}
