import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type StepType = "start" | "show" | "quiz";
type ResultType = "correct" | "fail" | "allfail" | null;

const WORD_POOL: string[] = [
  "달팽이",
  "토마토",
  "오렌지",
  "토끼",
  "비행기",
  "사슴벌레",
  "고래",
  "연필",
  "자동차",
  "바나나",
  "사과",
  "포도",
  "나비",
  "시계",
  "의자",
  "책",
  "강아지",
  "고양이",
  "비행선",
  "나무",
];

const TOTAL_QUESTIONS = 5;
const SHOW_COUNT = 5;

const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

export default function MemoryWordGame() {
  const navigate = useNavigate();

  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [step, setStep] = useState<StepType>("start");
  const [question, setQuestion] = useState(1);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [chance, setChance] = useState(2);

  const [shownWords, setShownWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<ResultType>(null);

  const setupQuestion = () => {
    const shuffled = shuffle(WORD_POOL);
    const showWords = shuffled.slice(0, SHOW_COUNT);
    const notShown = shuffled[SHOW_COUNT];

    setShownWords(showWords);
    setAnswer(notShown);
    setOptions(shuffle([...showWords.slice(0, SHOW_COUNT - 1), notShown]));
    setIndex(0);
    setChance(2);
    setResult(null);
    setStep("show");
  };

  useEffect(() => {
    if (step !== "start") setupQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const startGame = () => {
    setQuestion(1);
    setCorrectCount(0);
    setFinished(false);
    setupQuestion();
  };

  useEffect(() => {
    if (step !== "show" || shownWords.length === 0) return;

    if (index >= shownWords.length) {
      setStep("quiz");
      return;
    }

    setVisible(true);
    const hide = setTimeout(() => setVisible(false), 1000);
    const next = setTimeout(() => setIndex((p) => p + 1), 1000);

    return () => {
      clearTimeout(hide);
      clearTimeout(next);
    };
  }, [index, step, shownWords]);

  const handleSelect = (word: string) => {
    if (result || !answer) return;

    if (word === answer) {
      setCorrectCount((p) => p + 1);
      setResult("correct");
    } else if (chance > 1) {
      setChance((p) => p - 1);
      setResult("fail");
    } else {
      setChance(0);
      setResult("allfail");
    }
  };

  const replayWords = () => {
    setIndex(0);
    setResult(null);
    setStep("show");
  };

  const nextQuestion = () => {
    if (question >= TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }
    setQuestion((p) => p + 1);
  };

  /* ================= 결과 ================= */
  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-6">
        <h2 className="text-3xl font-bold mb-6">결과</h2>
        <p className="text-xl mb-2">총 {TOTAL_QUESTIONS}문제</p>
        <p className="text-2xl text-green-400">✅ {correctCount}문제 정답</p>
        <p className="text-xl text-red-400 mt-2">
          ❌ {TOTAL_QUESTIONS - correctCount}문제 오답
        </p>
        <button
          onClick={() => navigate("/quizlist")}
          className="mt-8 px-8 py-4 rounded-xl bg-blue-500 text-xl font-bold"
        >
          처음으로
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">
        기억력 테스트 ({question}/{TOTAL_QUESTIONS})
      </h2>

      <button
        onClick={() => navigate("/quizlist")}
        className="mb-6 px-6 py-3 rounded-lg bg-slate-700 text-lg"
      >
        처음으로
      </button>

      {/* 시작 */}
      {step === "start" && (
        <div className="text-center space-y-6">
          <p className="text-xl leading-relaxed">
            단어가 하나씩 나타납니다.
            <br />
            <strong className="text-yellow-300">보이지 않았던 단어</strong>를
            골라주세요.
          </p>
          <button
            onClick={startGame}
            className="px-10 py-4 rounded-2xl bg-green-500 text-2xl font-bold"
          >
            시작하기
          </button>
        </div>
      )}

      {/* 단어 표시 */}
      {step === "show" && (
        <div className="flex items-center justify-center h-[300px]">
          {visible && (
            <div className="text-5xl font-extrabold bg-white text-black px-10 py-6 rounded-2xl shadow-xl">
              {shownWords[index]}
            </div>
          )}
        </div>
      )}

      {/* 퀴즈 */}
      {step === "quiz" && (
        <div className="w-full max-w-md space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {options.map((word) => (
              <button
                key={word}
                onClick={() => handleSelect(word)}
                className="py-6 rounded-xl bg-white text-black text-2xl font-bold active:scale-95"
              >
                {word}
              </button>
            ))}
          </div>

          {result && (
            <div className="mt-6 text-center space-y-4">
              <div className="text-2xl font-bold">
                {result === "correct" && "✅ 정답입니다!"}
                {result === "fail" && `❌ 틀렸습니다 (남은 기회 ${chance})`}
                {result === "allfail" && "❌ 기회를 모두 사용했습니다"}
              </div>

              <div className="flex justify-center gap-4">
                {result === "fail" && (
                  <button
                    onClick={replayWords}
                    className="px-6 py-3 bg-yellow-400 text-black text-lg rounded-xl"
                  >
                    다시보기
                  </button>
                )}
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-blue-500 text-lg rounded-xl"
                >
                  {question === TOTAL_QUESTIONS ? "결과보기" : "다음 문제"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
