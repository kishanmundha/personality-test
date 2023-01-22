export interface Question {
  id: number;
  title: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  title: string;
}

export interface Result {
  id: number;
  title: string;
  description: string;
}

export interface SelectedAnswer {
  questionId: number;
  answerId: number;
}
