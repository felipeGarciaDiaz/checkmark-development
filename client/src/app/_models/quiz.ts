// client/src/app/models.ts
export interface Question {
  prompt: string;
  image?: string | null;
  answers: { [key: string]: string };
  correct: string;
}

export interface Theme {
  backgroundImage: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  buttonColor: string;
  hoverColor: string;
  fontFamily: string;
  fontSize: string;
}

export interface QuizConfig {
  title: string;
  theme: Theme;
  settings: {
    showImmediateFeedback: boolean;
    transitionTime: number;
    passPercentage: number;
  };
  questions: Question[];
}
