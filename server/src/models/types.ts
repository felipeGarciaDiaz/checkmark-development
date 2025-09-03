// server/src/types.ts
export type AnswerMap = Record<string, string>; // e.g. { A: "Mars", B: "Venus" }

export interface Question {
  id?: string;
  prompt: string;
  image?: string | null;
  answers: AnswerMap; // keys like A,B,C,D (or custom)
  correct: string; // key from answers
}

export interface Theme {
  backgroundImage?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  buttonColor?: string;
  hoverColor?: string;
  fontFamily?: string;
  fontSize?: string;
}

export interface QuizConfig {
  title: string;
  theme?: Theme;
  settings: {
    showImmediateFeedback: boolean;
    transitionTime?: number;
    passPercentage?: number; // 0-100
  };
  questions: Question[];
}

export type GamePhase = "lobby" | "in-progress" | "finished";

export interface Player {
  id: string;
  name: string;
  joinedAt: number;
  score: number;
  answers: {
    [questionIndex: number]: {
      answerKey: string;
      correct: boolean;
      at: number;
    };
  };
}

export interface GameState {
  id: string;
  code: string;
  hostId: string;
  createdAt: number;
  config: QuizConfig;
  phase: GamePhase;
  currentQuestionIndex: number; // -1 in lobby
  players: Record<string, Player>;
}