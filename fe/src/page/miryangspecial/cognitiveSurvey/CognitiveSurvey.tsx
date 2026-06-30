import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS: string[] = [
  "오늘이 몇 월이고, 무슨 요일인지를 잘 모른다",
  "자기가 놔둔 물건을 찾지 못한다",
  "같은 질문을 반복해서 한다",
  "약속을 하고서 잊어버린다",
  "물건을 가지러 갔다가 잊어버리고 그냥 온다",
  "물건이나 사람의 이름을 대기가 힘들어 머뭇거린다",
  "대화 중 내용이 이해되지 않아 반복해서 물어본다",
  "길을 잃거나 헤맨 적이 있다",
  "예전에 비해 계산능력이 떨어졌다",
  "예전에 비해 성격이 변했다",
  "이전에 잘 다루던 기구의 사용이 서툴러졌다",
  "예전에 비해 방이나 집안의 정리정돈을 하지 못한다",
  "상황에 맞게 옷을 선택해 입지 못한다",
  "혼자 대중교통 이용이 힘들다",
  "옷이 더러워도 갈아입지 않으려 한다",
];

const OPTIONS = [
  { label: "아니다", score: 0 },
  { label: "가끔 그렇다", score: 1 },
  { label: "자주 그렇다", score: 2 },
];

export default function CognitiveSurvey() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(15).fill(null),
  );

  const selectScore = (score: number) => {
    const copy = [...answers];
    copy[page - 1] = score;
    setAnswers(copy);
  };

  const totalScore = answers.reduce<number>((a, b) => a + (b ?? 0), 0);

  const next = () => {
    if (page < 15) {
      setPage((p) => p + 1);
    } else {
      navigate("/miryang/cognitive/result", {
        state: { totalScore },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center px-6 py-8">
      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">인지장애 선별 설문</h1>
        <span className="text-lg">{page} / 15</span>
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
            onClick={() => selectScore(opt.score)}
            className={`w-full py-5 rounded-xl text-xl font-bold border
              ${
                answers[page - 1] === opt.score
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
          >
            {opt.label} ({opt.score}점)
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
          {page === 15 ? "결과 보기" : "다음"}
        </button>
      </div>

      {/* Notice */}
      <p className="mt-8 text-sm text-white/70 text-center max-w-xl">
        ※ 본 설문은 자가진단용이며 의학적 진단을 대체하지 않습니다.
      </p>
    </div>
  );
}
