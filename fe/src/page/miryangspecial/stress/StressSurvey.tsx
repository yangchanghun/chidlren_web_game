import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS: string[] = [
  "예상치 못한 일로 당황했던 적이 얼마나 자주 있으신가요?",
  "중요한 일을 내 의지대로 조절할 수 없다고 느낀 적이 얼마나 자주 있으신가요?",
  "신경이 예민해지고 스트레스를 받고 있다고 느낀 적이 얼마나 자주 있으신가요?",
  "꼭 해야 할 일을 해낼 수 없겠다고 느낀 적이 얼마나 자주 있으신가요?",
  "통제할 수 없는 일로 화를 낸 경험이 얼마나 자주 있으신가요?",
  "난해한 일들이 해결되지 않을 것 같다고 느낀 적이 얼마나 자주 있으신가요?",
  "짜증이 나도 참고 잘 넘겼다고 느낀 적이 얼마나 자주 있으신가요?",
  "컨디션이 정말 좋다고 느낀 적이 얼마나 자주 있으신가요?",
  "문제를 해결할 자신감이 있다고 느낀 적이 얼마나 자주 있으신가요?",
  "일이 생각대로 잘 진행되고 있다고 느낀 적이 얼마나 자주 있으신가요?",
];

const OPTIONS = [
  { label: "전혀 없다", score: 0 },
  { label: "거의 없다", score: 1 },
  { label: "종종 있다", score: 2 },
  { label: "자주 있다", score: 3 },
  { label: "매우 자주 있다", score: 4 },
];

// 역채점 문항 (0-based index)
const REVERSE_INDEX = [6, 7, 8, 9];

export default function StressSurvey() {
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

  const totalScore = answers.reduce<number>((sum, val, idx) => {
    if (val === null) return sum;
    if (REVERSE_INDEX.includes(idx)) return sum + (4 - val);
    return sum + val;
  }, 0);

  const next = () => {
    if (page < QUESTIONS.length) {
      setPage((p) => p + 1);
    } else {
      navigate("/miryang/stress/result", {
        state: { totalScore },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center px-6 py-8">
      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">스트레스 자가진단</h1>
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
        ※ 본 설문은 자가진단용이며 의학적 진단을 대체하지 않습니다.
      </p>
    </div>
  );
}
