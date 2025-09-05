export interface Question {
  type: 'multiple-choice' | 'matching' | 'true-false' | 'short-answer';
  prompt: string;
  image?: string | null;
  answers: Answer[];
}
export interface Answer {
  text: string;
  isCorrect: boolean;
}
export interface QuizSettings {
  timeLimit: number; // in seconds, 0 = no limit
  maxAttempts: number;
  shuffleQuestions: boolean;
  allowBackNavigation: boolean;
  showCorrectAnswers: boolean;
  enableLeaderboard: boolean;
  allowSkips: boolean;
  questionTimer: boolean;
  randomizeOptions: boolean;
  showProgressBar: boolean;
}
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string[];
  font: [string, string];
}
export interface QuizConfig {
  title: string;
  description: string;
  theme: Theme;
  settings: QuizSettings;
  questions: Question[];
}
