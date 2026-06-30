import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GameBoard from "./GameBoard";
import PigCharacter from "./PigCharacter";
import { Modal } from "./Modal";
/* =======================
 * 시간 포맷 함수
 * ======================= */
function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}분 ${sec}초`;
}

const PigIndex = () => {
  const navigate = useNavigate();

  const TOTAL_QUESTIONS = 5;

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  /* =======================
   * 게임 시작
   * ======================= */
  const handleStart = () => {
    setStarted(true);
    setFinished(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  /* =======================
   * 게임 종료
   * ======================= */
  const handleFinish = () => {
    setFinished(true);
    setEndTime(Date.now());
  };

  /* =======================
   * 다시하기
   * ======================= */
  const handleRestart = () => {
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setEndTime(null);
  };

  const elapsed = startTime && endTime ? formatTime(endTime - startTime) : null;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <PigCharacter size={56} />
            <h1 className="text-3xl md:text-4xl font-bold">길찾기 놀이</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            화살표를 따라 돼지가 어디로 가는지 맞춰보세요!
          </p>
          <button
            className="mb-6 px-6 py-3 rounded-lg text-white bg-slate-700 text-lg"
            onClick={() => {
              navigate("/quizlist");
            }}
          >
            처음으로
          </button>
        </header>

        {/* Game */}
        <main>
          {started && (
            <GameBoard
              totalQuestions={TOTAL_QUESTIONS}
              onFinish={handleFinish}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-muted-foreground text-sm">
          <p>🧠 인지 훈련 게임</p>
        </footer>
      </div>

      {/* 시작 모달 */}
      {!started && !finished && (
        <Modal>
          <PigCharacter size={80} />
          <h2 className="text-2xl font-bold mb-4">게임을 시작할까요?</h2>
          <button
            onClick={handleStart}
            className="px-10 py-5 rounded-3xl bg-primary text-primary-foreground text-xl font-bold shadow-lg hover:scale-105 transition"
          >
            시작하기
          </button>
        </Modal>
      )}

      {/* 결과 모달 */}
      {finished && elapsed && (
        <Modal>
          <PigCharacter size={72} />
          <h2 className="text-2xl font-bold mb-2">🎉 완료!</h2>
          <p className="text-xl mb-6">
            소요 시간: <span className="font-bold">{elapsed}</span>
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="px-8 py-4 rounded-2xl bg-secondary text-secondary-foreground text-lg font-bold"
            >
              다시하기
            </button>
            <button
              onClick={() => navigate("/quizlist")}
              className="px-8 py-4 rounded-2xl bg-muted text-muted-foreground text-lg font-bold"
            >
              처음으로
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PigIndex;
