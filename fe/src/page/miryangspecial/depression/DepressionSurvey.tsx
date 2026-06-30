import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= 질문 ================= */
const QUESTIONS: string[] = [
  "평상시에는 아무렇지도 않던 일들이 귀찮게 느껴졌다.",
  "입맛이 없었다.",
  "가족이나 친구들을 만나도 기분이 좋지 않았다.",
  "나는 남들만큼 괜찮은 사람이라고 생각했다.",
  "일에 집중하기가 어려웠다.",
  "기분이 우울했다.",
  "모든 일이 어렵게 느껴졌다.",
  "미래에 대해 희망적으로 느꼈다.",
  "내 인생은 실패작이라고 느꼈다.",
  "두려움을 느꼈다.",
  "잠을 시원하게 못 잤다.",
  "행복한 편이었다.",
  "대화를 평소보다 적게 했다.",
  "외로움을 느꼈다.",
  "사람들이 다정하지 않다고 느꼈다.",
  "생활이 즐겁다고 느꼈다.",
  "울었던 적이 있다.",
  "슬픔을 느꼈다.",
  "사람들이 나를 싫어한다고 느꼈다.",
  "무슨 일이든 잘 할 수 없다고 느꼈다.",
];

/* 긍정 문항 (점수 반전, 1-based) */
const POSITIVE = [4, 8, 12, 16];

const NEGATIVE_OPTIONS = [
  { label: "전혀 아니다", score: 0 },
  { label: "가끔 그렇다", score: 1 },
  { label: "자주 그렇다", score: 2 },
  { label: "항상 그렇다", score: 3 },
];

const POSITIVE_OPTIONS = [
  { label: "항상 그렇다", score: 0 },
  { label: "가끔 그렇다", score: 1 },
  { label: "자주 그렇다", score: 2 },
  { label: "전혀 아니다", score: 3 },
];

export default function DepressionSurvey() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );

  const isPositive = POSITIVE.includes(page);
  const options = isPositive ? POSITIVE_OPTIONS : NEGATIVE_OPTIONS;

  const select = (score: number) => {
    const copy = [...answers];
    copy[page - 1] = score;
    setAnswers(copy);
  };

  const totalScore = answers.reduce<number>((a, b) => a + (b ?? 0), 0);

  const next = () => {
    if (page < QUESTIONS.length) {
      setPage((p) => p + 1);
    } else {
      navigate("/miryang/depression/result", {
        state: { totalScore },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center px-6 py-8">
      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">우울증 자가진단</h1>
        <span className="text-lg">
          {page} / {QUESTIONS.length}
        </span>
        <button
          className="mb-6 px-6 py-3 rounded-lg bg-slate-700 text-lg"
          onClick={() => {
            navigate("/quizlist");
          }}
        >
          처음으로
        </button>
      </div>

      {/* Question */}
      <div className="w-full max-w-xl bg-white text-black rounded-2xl p-6 text-xl font-semibold mb-6">
        {page}. {QUESTIONS[page - 1]}
      </div>

      {/* Options */}
      <div className="w-full max-w-xl space-y-4">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => select(opt.score)}
            className={`w-full py-5 rounded-xl text-xl font-bold border
              ${
                answers[page - 1] === opt.score
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-6 py-3 bg-slate-700 rounded-xl text-lg disabled:opacity-40"
        >
          이전
        </button>
        <button
          disabled={answers[page - 1] === null}
          onClick={next}
          className="px-6 py-3 bg-green-500 rounded-xl text-lg font-bold disabled:opacity-40"
        >
          {page === QUESTIONS.length ? "결과 보기" : "다음"}
        </button>
      </div>

      <p className="mt-8 text-sm text-white/70 text-center max-w-xl">
        ※ 본 설문은 자가진단용이며, 의학적 진단을 대체하지 않습니다.
      </p>
    </div>
  );
}
