import { useState, useEffect, useCallback, useMemo } from "react";
import ArrowSequence from "./ArrowSequence";
import PathGrid from "./PathGrid";
// import { button } from "@/components/ui/button";
import { RefreshCw, Check } from "lucide-react";

/* =======================
 * 타입 정의
 * ======================= */
type GameBoardProps = {
  totalQuestions: number;
  onFinish: () => void;
};

type Direction = "up" | "down" | "left" | "right";

type CellType = "empty" | "start" | "tree" | "house" | "apple" | "pond";

interface Puzzle {
  grid: CellType[][];
  correctAnswer: "tree" | "house" | "apple" | "pond";
  startPosition: { row: number; col: number };
}
function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function generateArrows(
  start: { row: number; col: number },
  target: { row: number; col: number },
): Direction[] {
  const rowDiff = target.row - start.row;
  const colDiff = target.col - start.col;

  const vertical =
    rowDiff > 0 ? Array(rowDiff).fill("down") : Array(-rowDiff).fill("up");

  const horizontal =
    colDiff > 0 ? Array(colDiff).fill("right") : Array(-colDiff).fill("left");

  return shuffle([...vertical, ...horizontal]);
}
/* =======================
 * 퍼즐 데이터 (장판 버전)
 * ======================= */
const puzzles: Puzzle[] = [
  {
    grid: [
      ["tree", "empty", "empty", "empty", "house"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["apple", "empty", "start", "empty", "pond"],
    ],
    correctAnswer: "pond",
    startPosition: { row: 4, col: 2 },
  },
  {
    grid: [
      ["house", "empty", "empty", "empty", "tree"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "start", "empty", "empty"],
      ["pond", "empty", "empty", "empty", "apple"],
    ],
    correctAnswer: "house",
    startPosition: { row: 3, col: 2 },
  },
  {
    grid: [
      ["apple", "empty", "empty", "empty", "pond"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["tree", "empty", "start", "empty", "house"],
    ],
    correctAnswer: "pond",
    startPosition: { row: 4, col: 2 },
  },
  {
    grid: [
      ["pond", "empty", "empty", "empty", "tree"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "start", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["house", "empty", "empty", "empty", "apple"],
    ],
    correctAnswer: "house",
    startPosition: { row: 2, col: 2 },
  },
  {
    grid: [
      ["tree", "empty", "empty", "empty", "apple"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "start", "empty", "empty"],
      ["pond", "empty", "empty", "empty", "house"],
    ],
    correctAnswer: "tree",
    startPosition: { row: 3, col: 2 },
  },
];

/* =======================
 * GameBoard
 * ======================= */
const GameBoard = ({ totalQuestions, onFinish }: GameBoardProps) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] =
    useState<CellType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  /* =======================
   * 화살표 자동 생성
   * ======================= */
  const arrows = useMemo<Direction[]>(() => {
    let target = { row: 0, col: 0 };

    currentPuzzle.grid.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell === currentPuzzle.correctAnswer) {
          target = { row: r, col: c };
        }
      }),
    );

    return generateArrows(currentPuzzle.startPosition, target);
  }, [currentPuzzle]);

  /* =======================
   * 핸들러
   * ======================= */
  const handleSelectDestination = (dest: CellType) => {
    if (!showResult) setSelectedDestination(dest);
  };

  const handleCheckAnswer = () => {
    if (!selectedDestination) return;
    setShowResult(true);
    if (selectedDestination === currentPuzzle.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNextPuzzle = useCallback(() => {
    setCurrentPuzzleIndex((i) => {
      const next = i + 1;

      // ⭐ 마지막 문제면 게임 종료
      if (next >= totalQuestions) {
        onFinish();
        return i; // 더 이상 진행 ❌
      }

      return next;
    });

    setSelectedDestination(null);
    setShowResult(false);
  }, [totalQuestions, onFinish]);

  const handleReset = () => {
    setCurrentPuzzleIndex(0);
    setSelectedDestination(null);
    setShowResult(false);
    setScore(0);
  };

  /* 자동 다음 문제 */
  useEffect(() => {
    if (showResult && selectedDestination === currentPuzzle.correctAnswer) {
      const t = setTimeout(handleNextPuzzle, 1500);
      return () => clearTimeout(t);
    }
  }, [
    showResult,
    selectedDestination,
    currentPuzzle.correctAnswer,
    handleNextPuzzle,
  ]);

  /* =======================
   * 렌더
   * ======================= */
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      {/* 상단 정보 */}
      <div className="flex gap-4 text-lg font-medium">
        <span className="bg-secondary px-4 py-2 rounded-full">
          문제 {currentPuzzleIndex + 1} / {totalQuestions}
        </span>
        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
          점수 {score}
        </span>
      </div>

      {/* 화살표 */}
      <div className="game-card w-full p-4">
        <p className="text-center text-muted-foreground mb-3 font-medium">
          화살표 방향을 따라가세요!
        </p>
        <ArrowSequence arrows={arrows} />
      </div>

      {/* 그리드 */}
      <div className="game-card w-full p-4">
        <PathGrid
          grid={currentPuzzle.grid}
          selectedDestination={selectedDestination}
          correctAnswer={currentPuzzle.correctAnswer}
          showResult={showResult}
          onSelectDestination={handleSelectDestination}
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-4">
        {!showResult ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedDestination}
            className="
    flex items-center gap-3
    px-10 py-7
    rounded-3xl
    bg-primary text-primary-foreground
    text-xl font-bold
    shadow-xl
    transition-all duration-200
    hover:scale-105 active:scale-95
    disabled:opacity-40 disabled:scale-100
  "
          >
            <Check className="w-6 h-6" />
            확인하기
          </button>
        ) : (
          <button
            onClick={handleNextPuzzle}
            className="
    flex items-center gap-3
    px-10 py-7
    rounded-3xl
    bg-secondary text-secondary-foreground
    text-xl font-bold
    shadow-xl
    transition-all duration-200
    hover:scale-105 active:scale-95
  "
          >
            다음 문제
          </button>
        )}

        <button
          onClick={handleReset}
          className="
    flex items-center justify-center
    px-7 py-7
    rounded-3xl
    bg-muted
    text-muted-foreground
    shadow-md
    transition-all duration-200
    hover:bg-destructive/20 hover:scale-105
    active:scale-95
  "
          aria-label="다시 시작"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* 결과 */}
      {showResult && (
        <div
          className={`text-xl font-bold ${
            selectedDestination === currentPuzzle.correctAnswer
              ? "text-game-success"
              : "text-destructive"
          }`}
        >
          {selectedDestination === currentPuzzle.correctAnswer
            ? "🎉 정답이에요!"
            : "😅 틀렸어요!"}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
