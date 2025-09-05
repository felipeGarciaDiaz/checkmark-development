import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  description: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string[];
    font: [string, string];
  };
  settings: {
    timeLimit: number;
    maxAttempts: number;
    shuffleQuestions: boolean;
    allowBackNavigation: boolean;
    showCorrectAnswers: boolean;
    enableLeaderboard: boolean;
    allowSkips: boolean;
    questionTimer: boolean;
    randomizeOptions: boolean;
    showProgressBar: boolean;
  };
  questions: {
    type: string;
    prompt: string;
    image?: string;
    answers: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

const QuizSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  theme: {
    primaryColor: { type: String, required: true },
    secondaryColor: { type: String, required: true },
    backgroundColor: { type: [String], required: true },
    font: { type: [String], required: true },
  },
  settings: {
    timeLimit: { type: Number, required: true },
    maxAttempts: { type: Number, required: true },
    shuffleQuestions: { type: Boolean, required: true },
    allowBackNavigation: { type: Boolean, required: true },
    showCorrectAnswers: { type: Boolean, required: true },
    enableLeaderboard: { type: Boolean, required: true },
    allowSkips: { type: Boolean, required: true },
    questionTimer: { type: Boolean, required: true },
    randomizeOptions: { type: Boolean, required: true },
    showProgressBar: { type: Boolean, required: true },
  },
  questions: [{
    type: { type: String, required: true },
    prompt: { type: String, required: true },
    image: { type: String },
    answers: [{
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    }],
  }],
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
