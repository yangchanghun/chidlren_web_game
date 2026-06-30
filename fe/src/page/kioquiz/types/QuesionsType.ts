import type { ChoicesType } from "./ChoicesType";

export type QuestionType = {
  id?: number;
  type: string;
  title: string;
  questions: QuestionsType[];
  img?: string;
  created_at?: string;
};

export type QuestionsType = {
  id: number;
  question: string;
  answers: number[];
  choices: ChoicesType[];
  description?: string;

  // 질문 이미지
  image?: string;
  imageFile?: File;
};
