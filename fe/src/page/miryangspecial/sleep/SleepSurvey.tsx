import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS: string[] = [
  "잠들기까지 시간이 오래 걸린다고 느낀 적이 얼마나 자주 있으신가요?",
  "밤중에 자주 깨거나 다시 잠들기 어려웠던 적이 얼마나 자주 있으신가요?",
  "너무 일찍 깨서 다시 잠들지 못한 적이 얼마나 자주 있으신가요?",
  "전반적으로 수면의 질이 나쁘다고 느낀 적이 얼마나 자주 있으신가요?",
  "수면 문제로 낮 동안 피로하거나 졸린 적이 얼마나 자주 있으신가요?",
  "수면 문제로 일상생활에 지장이 있다고 느낀 적이 얼마나 자주 있으신가요?",
  "현재의 수면 상태에 대해 얼마나 불만족스럽다고 느끼시나요?",
];

const OPTIONS = [
  { label: "전혀 그렇지 않다", score: 0 },
  { label: "가끔 그렇다 (주 1일)", score: 1 },
  { label: "보통이다 (주 2일)", score: 2 },
  { label: "꽤 그렇다 (주 4일)", score: 3 },
  { label: "매우 그렇다 (주 5일 이상)", score: 4 },
];

export default function SleepSurvey() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );

  const select = (score: number) => {
    const copy = [...answers];
    copy[page - 1] = score;
    setAnswers(copy);
  };

  const totalScore = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0);

  const next = () => {
    if (page < QUESTIONS.length) {
      setPage((p) => p + 1);
    } else {
      navigate("/miryang/sleep/result", {
        state: { totalScore },
      });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white flex flex-col items-center px-6 py-8">
      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">수면 자가진단</h1>
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
        {QUESTIONS[page - 1]}
      </div>

      {/* Options */}
      <div className="w-full max-w-xl space-y-4">
        {OPTIONS.map((opt) => (
          <button
            key={opt.score}
            onClick={() => select(opt.score)}
            className={`w-full py-4 rounded-xl text-lg font-bold border
              ${
                answers[page - 1] === opt.score
                  ? "bg-indigo-500 text-white"
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
        ※ 본 설문은 자가진단용이며 의학적 진단을 대체하지 않습니다.
      </p>
    </div>
  );
}
