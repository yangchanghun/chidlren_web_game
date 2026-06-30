// import type { ChoicesType } from "@/types/ChoicesType";
// import type { QuestionsType } from "@/types/QuesionsType";

// export const choices: ChoicesType[] = [
//   {
//     id: 1,
//     label: "바퀴벌레",
//     img: "/src/test",
//   },
//   {
//     id: 2,
//     label: "토마토",
//     img: "",
//   },
//   { id: 3, label: "브로콜리", img: "/src/test" },
//   { id: 4, label: "양상추", img: "" },
// ];

// export const questions: QuestionsType[] = [
//   {
//     id: 1,
//     question: "다음 중 채소가 아닌 것은?",
//     answers: ["2", "3"],
//     description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
//     choices: choices,
//   },
//   {
//     id: 2,
//     question: "다음 중 채소가 아닌 것은?",
//     answers: ["2", "3"],
//     description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
//     choices: choices,
//   },
// ];

// export const question = {
//   title: "채소맞추기 퀴즈",
//   questions: questions,
// };

import type { ChoicesType } from "../types/ChoicesType";
import type { QuestionsType, QuestionType } from "../types/QuesionsType";

/*
참고 ㄱㄱ
.children-traffic-image-slot {
  width: 100%;
  height: 200px;
  background: #e6f4ff;
  border-radius: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.children-traffic-image-slot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
*/

export const choices1: ChoicesType[] = [
  {
    id: 1,
    label: "파프리카",
    order: 1,
  },
  { id: 2, label: "토마토", order: 2 },
  { id: 3, label: "수박", order: 3 },
  { id: 4, label: "딸기", order: 4 },
];
export const choices2: ChoicesType[] = [
  { id: 1, label: "", order: 1, image: "tomato.png" },
  { id: 2, label: "", order: 2, image: "strawberry.png" },
  { id: 3, label: "", order: 3, image: "grape.png" },
  { id: 4, label: "", order: 4, image: "blueberry.png" },
];
export const choices3: ChoicesType[] = [
  { id: 1, label: "고구려", order: 1 },
  { id: 2, label: "백제", order: 2 },
  { id: 3, label: "신라", order: 3 },
  { id: 4, label: "고려", order: 4 },
];
export const choices4: ChoicesType[] = [
  { id: 1, label: "춘향전", order: 1 },
  { id: 2, label: "이몽룡", order: 2 },
  { id: 3, label: "변학도", order: 3 },
  { id: 4, label: "심청", order: 4 },
];
export const choices5: ChoicesType[] = [
  { id: 1, label: "양반", order: 1 },
  { id: 2, label: "중인", order: 2 },
  { id: 3, label: "평민", order: 3 },
  { id: 4, label: "시민", order: 4 },
];
export const choices6: ChoicesType[] = [
  { id: 1, label: "8월15일", order: 1 },
  { id: 2, label: "9월9일", order: 2 },
  { id: 3, label: "10월9일", order: 3 },
  { id: 4, label: "12월25일", order: 4 },
];
export const choices7: ChoicesType[] = [
  { id: 1, label: "부여", order: 1 },
  { id: 2, label: "고조선", order: 2 },
  { id: 3, label: "발해", order: 3 },
  { id: 4, label: "가야", order: 4 },
];
export const choices8: ChoicesType[] = [
  { id: 1, label: "태조 왕건", order: 1 },
  { id: 2, label: "세종대왕", order: 2 },
  { id: 3, label: "이성계", order: 3 },
  { id: 4, label: "광개토대왕", order: 4 },
];
export const choices9: ChoicesType[] = [
  { id: 1, label: "나라를 넓힌다", order: 1 },
  { id: 2, label: "백성을 다스린다", order: 2 },
  { id: 3, label: "널리 인간을 이롭게 한다", order: 3 },
  { id: 4, label: "하늘을 섬긴다", order: 4 },
];
export const choices10: ChoicesType[] = [
  { id: 1, label: "동해", order: 1 },
  { id: 2, label: "서해", order: 2 },
  { id: 3, label: "남해", order: 3 },
  { id: 4, label: "인당수", order: 4 },
];
export const questions: QuestionsType[] = [
  {
    id: 1,
    question: "다음 이미지의 채소는 무엇일까요?",
    answers: [2],
    description: " 토마토는 붉은색을 띠며, 비타민 C가 풍부한 채소입니다.",
    choices: choices1,
    image: "tomato.png",
  },
  {
    id: 2,
    question: "포도는 어떻게 생겼을까요?",
    answers: [3],
    description:
      "포도는 둥글고 작은 열매가 모여서 송이를 이루며, 보라색이나 초록색을 띠는 과일입니다.",
    choices: choices2,
  },
  {
    id: 3,
    question: "우리나라 최초의 통일국가는",
    answers: [3],
    description: `
고구려, 백제, 신라가 나뉘어 있던 삼국 시대 이후 신라가 다른 나라들을 통일했습니다.
그래서 신라는 우리나라 최초의 통일 국가로 불립니다.
`,
    choices: choices3,
  },
  {
    id: 4,
    question: "『춘향전』에 나오는 주인공이 아닌 사람은?",
    answers: [4],
    description: `
성춘향과 이몽룡, 변학도는 『춘향전』에 나오는 인물입니다.
심청은 눈먼 아버지를 위해 자신을 희생한 효녀로, 『심청전』의 주인공입니다.
`,
    choices: choices4,
  },
  {
    id: 5,
    question: "조선 시대의 신분 제도가 아닌 것은?",
    answers: [4],
    description: `
조선 시대에는 태어날 때부터 신분이 정해졌습니다.
양반, 중인, 평민, 천민으로 나뉘었고, ‘시민’이라는 말은 현대 사회에서 쓰이는 개념입니다.
`,
    choices: choices5,
  },
  {
    id: 6,
    question: "한글날은 몇 월 며칠일까요?",
    answers: [3],
    description: `
한글날은 훈민정음이 세상에 공식적으로 알려진 날을 기념하는 날입니다.
이 날을 통해 한글의 소중함과 세종대왕의 뜻을 되새깁니다.
`,
    choices: choices6,
  },
  {
    id: 7,
    question: "단군 왕검이 세운 나라는?",
    answers: [2],
    description: `
고조선은 단군 왕검이 세운 나라로, 우리 민족 최초의 국가로 알려져 있습니다. 개천절도 단군의 건국을 기념하는 날입니다.
`,
    choices: choices7,
  },
  {
    id: 8,
    question: "고려를 세운 왕은 누구일까요?",
    answers: [1],
    description: `
태조 왕건은 고려를 세운 왕으로, 혼란스러웠던 후삼국 시대를 끝내고 나라를 하나로 모았습니다.`,
    choices: choices8,
  },
  {
    id: 9,
    question: "“홍익인간”의 뜻으로 가장 알맞은 것은?",
    answers: [3],
    description: `
‘홍익인간’은 우리 민족의 기본 정신으로, 나만 잘 사는 것이 아니라 모두가 함께 잘 살자는 뜻을 담고 있습니다.
`,
    choices: choices9,
  },
  {
    id: 10,
    question: "『심청전』에서 심청이가 뛰어든 바다는?",
    answers: [4],
    description: `
고조선은 단군 왕검이 세운 나라로, 우리 민족 최초의 국가로 알려져 있습니다. 개천절도 단군의 건국을 기념하는 날입니다.
`,
    choices: choices10,
  },
];

export const quizSet: QuestionType = {
  type: "multiple",
  title: "채소맞추기 퀴즈",
  questions: questions,
  img: "sumnail.png",
};
