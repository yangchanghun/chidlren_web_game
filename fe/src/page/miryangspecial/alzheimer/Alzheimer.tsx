import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS: string[] = [
  "며칠 전에 나누었던 대화 내용을 기억하는 것은 어떻습니까?",
  "최근에 했던 약속을 기억하는 것은 어떻습니까?",
  "최근에 주변에서 일어났던 일을 기억하는 것은 어떻습니까?",
  "가스불이나 전깃불을 켜놓고 끄는 것을 잊어버리는 것은 어떻습니까?",
  "새로 마련한 가전제품이나 기구의 사용법을 익히는 능력은 어떻습니까?",
  "개인위생을 관리하는 능력은 어떻습니까?",
  "중요한 기념일을 기억하는 것은 어떻습니까?",
  "거스름돈 계산은 어떻습니까?",
  "말문이 막히는 경우는 어떻습니까?",
  "물건 이름을 정확히 말하는 정도는 어떻습니까?",
  "가까운 사람의 이름을 기억하는 것은 어떻습니까?",
  "사는 곳이나 직업을 기억하는 것은 어떻습니까?",
  "주소나 전화번호를 기억하는 것은 어떻습니까?",
  "집 안 기구를 다루는 능력은 어떻습니까?",
  "일상적인 결정을 내리는 능력은 어떻습니까?",
];

const VOICES = Array.from(
  { length: 15 },
  (_, i) => `/miryang/alzhemier_voice/${i + 1}.mp3`,
);

export default function Alzheimer() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(15).fill(null),
  );

  const score = answers.reduce<number>((a, b) => a + (b ?? 0), 0);

  const selectScore = (s: number) => {
    const copy = [...answers];
    copy[page - 1] = s;
    setAnswers(copy);
  };

  const next = () => {
    if (page === 15) {
      navigate("/miryang/alzhemier/result", {
        state: { totalScore: score },
      });
    } else {
      setPage((p) => p + 1);
    }
  };

  const prev = () => setPage((p) => Math.max(1, p - 1));

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center px-6 py-8">
      <audio src={VOICES[page - 1]} autoPlay />

      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">치매 선별 설문</h1>
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
      <div className="bg-white text-black w-full max-w-xl rounded-2xl p-6 text-xl font-semibold mb-6">
        {QUESTIONS[page - 1]}
      </div>

      {/* Options */}
      <div className="w-full max-w-xl space-y-4">
        {[0, 1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => selectScore(s)}
            className={`w-full py-5 rounded-xl text-xl font-bold border
              ${
                answers[page - 1] === s
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
          >
            {
              [
                "10년 전과 차이 없음",
                "조금 나빠짐",
                "많이 나빠짐",
                "거의 기억 못함",
              ][s]
            }
          </button>
        ))}
      </div>

      {/* Nav */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-6 py-3 bg-slate-700 rounded-xl text-lg disabled:opacity-40"
        >
          이전
        </button>
        <button
          onClick={next}
          disabled={answers[page - 1] === null}
          className="px-6 py-3 bg-green-500 rounded-xl text-lg font-bold disabled:opacity-40"
        >
          {page === 15 ? "결과 보기" : "다음"}
        </button>
      </div>

      {/* Notice */}
      <p className="mt-8 text-sm text-white/70 text-center max-w-xl">
        ※ 본 설문은 자가진단용이며, 정확한 진단은 전문의 상담이 필요합니다.
      </p>
    </div>
  );
}
