import { useEffect, useRef, useState } from "react";
// 🚀 분리해둔 API 파일 불러오기 (경로: src/page 에서 src/api 로 접근)
import { getTopScores, addScore, type ScoreRecord } from "../api/leaderboard";

type Player = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
};

type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
};

type KeyState = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;

export default function SurfGamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const surferImageRef = useRef<HTMLImageElement | null>(null);

  const playerRef = useRef<Player>({
    x: CANVAS_WIDTH / 2 - 45,
    y: CANVAS_HEIGHT - 160,
    width: 90,
    height: 120,
    speed: 5,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);

  const keysRef = useRef<KeyState>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const gameOverRef = useRef(false);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 🚀 랭킹 시스템을 위한 상태 추가
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<ScoreRecord[]>([]);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

  // 🚀 리더보드 가져오기 함수
  const fetchLeaderboard = async () => {
    const data = await getTopScores();
    setLeaderboard(data);
  };

  // 🚀 점수 등록 함수
  const submitScore = async () => {
    if (!playerName.trim()) return alert("닉네임을 입력해주세요!");

    const isSuccess = await addScore(playerName, score);
    if (isSuccess) {
      setIsScoreSubmitted(true);
      fetchLeaderboard(); // 성공 시 리더보드 즉시 갱신
    } else {
      alert("점수 등록에 실패했습니다.");
    }
  };

  // 🚀 컴포넌트 렌더링 시 리더보드 한 번 불러오기
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const resetGame = () => {
    playerRef.current = {
      x: CANVAS_WIDTH / 2 - 45,
      y: CANVAS_HEIGHT - 160,
      width: 90,
      height: 120,
      speed: 5,
    };

    obstaclesRef.current = [];
    scoreRef.current = 0;
    frameRef.current = 0;
    gameOverRef.current = false;

    setScore(0);
    setGameOver(false);
    setIsScoreSubmitted(false); // 🚀 재시작 시 폼 초기화
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/surf/image.png";

    img.onload = () => {
      surferImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        e.preventDefault();
        keysRef.current[e.key as keyof KeyState] = true;
      }

      // 🚨 점수 입력 중일 때는 스페이스바로 게임이 리셋되지 않도록 방어 로직 추가
      if (
        e.key === " " &&
        gameOverRef.current &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        e.preventDefault();
        resetGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        e.preventDefault();
        keysRef.current[e.key as keyof KeyState] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawSea = () => {
      ctx.fillStyle = "#36c4df";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.lineWidth = 2;

      for (let i = 0; i < 10; i++) {
        const x = (i * 120 + frameRef.current * 0.5) % CANVAS_WIDTH;
        const y = 40 + i * 40;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 20, y - 10, x + 40, y);
        ctx.quadraticCurveTo(x + 60, y + 10, x + 80, y);
        ctx.stroke();
      }
    };

    const drawPlayer = (player: Player) => {
      const img = surferImageRef.current;

      if (!img) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        return;
      }

      ctx.drawImage(img, player.x, player.y, player.width, player.height);
    };

    const drawObstacle = (obstacle: Obstacle) => {
      ctx.fillStyle = "#6b7280";

      ctx.beginPath();
      ctx.arc(obstacle.x, obstacle.y, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(obstacle.x + 30, obstacle.y + 8, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(obstacle.x - 25, obstacle.y + 15, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.stroke();
    };

    const drawScore = () => {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px Arial";
      ctx.fillText(`SCORE ${Math.floor(scoreRef.current)}`, 24, 38);
    };

    const drawGameOver = () => {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

      ctx.font = "20px Arial";
      ctx.fillText(
        "스페이스바를 눌러 다시 시작",
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 + 25,
      );

      ctx.textAlign = "left";
    };

    const isCollision = (player: Player, obstacle: Obstacle) => {
      const playerHitBox = {
        x: player.x + 25,
        y: player.y + 25,
        width: player.width - 50,
        height: player.height - 45,
      };

      return (
        playerHitBox.x < obstacle.x + obstacle.width &&
        playerHitBox.x + playerHitBox.width > obstacle.x &&
        playerHitBox.y < obstacle.y + obstacle.height &&
        playerHitBox.y + playerHitBox.height > obstacle.y
      );
    };

    const updatePlayer = () => {
      const player = playerRef.current;
      const keys = keysRef.current;

      if (keys.ArrowLeft) player.x -= player.speed;
      if (keys.ArrowRight) player.x += player.speed;
      if (keys.ArrowUp) player.y -= player.speed;
      if (keys.ArrowDown) player.y += player.speed;

      player.x = Math.max(0, Math.min(CANVAS_WIDTH - player.width, player.x));
      player.y = Math.max(0, Math.min(CANVAS_HEIGHT - player.height, player.y));
    };

    const createObstacle = () => {
      const size = 45;
      const x = Math.random() * (CANVAS_WIDTH - size);

      obstaclesRef.current.push({
        x,
        y: -60,
        width: size,
        height: size,
        speed: 3 + Math.random() * 2,
      });
    };

    const updateObstacles = () => {
      obstaclesRef.current = obstaclesRef.current
        .map((obstacle) => ({
          ...obstacle,
          y: obstacle.y + obstacle.speed,
        }))
        .filter((obstacle) => obstacle.y < CANVAS_HEIGHT + 80);
    };

    const gameLoop = () => {
      frameRef.current += 1;

      drawSea();

      if (!gameOverRef.current) {
        updatePlayer();

        if (frameRef.current % 70 === 0) {
          createObstacle();
        }

        updateObstacles();

        scoreRef.current += 0.1;

        if (frameRef.current % 10 === 0) {
          setScore(Math.floor(scoreRef.current));
        }

        for (const obstacle of obstaclesRef.current) {
          if (isCollision(playerRef.current, obstacle)) {
            gameOverRef.current = true;
            setGameOver(true);
          }
        }
      }

      obstaclesRef.current.forEach(drawObstacle);
      drawPlayer(playerRef.current);
      drawScore();

      if (gameOverRef.current) {
        drawGameOver();
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white py-10">
      <h1 className="mb-4 text-3xl font-bold">Surf Game 🏄‍♂️</h1>

      <div className="mb-3 text-lg">
        점수: <span className="font-bold text-cyan-300">{score}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-2xl border-4 border-white shadow-2xl bg-cyan-400"
      />

      <div className="mt-4 text-center text-sm text-gray-300">
        방향키로 이동 / 게임오버 시 스페이스바로 재시작
      </div>

      {/* 🚀 게임 오버 시 랭킹 등록 폼 */}
      {gameOver && (
        <div className="mt-6 flex flex-col items-center bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            게임 오버! 최종 점수: {score}
          </h2>

          {!isScoreSubmitted ? (
            <div className="flex w-full gap-2">
              <input
                type="text"
                maxLength={8}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="닉네임 (최대 8자)"
                className="flex-1 px-4 py-2 rounded-xl text-black outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={submitScore}
                className="rounded-xl bg-cyan-500 px-6 py-2 font-bold text-white hover:bg-cyan-400 whitespace-nowrap"
              >
                점수 등록
              </button>
            </div>
          ) : (
            <div className="text-green-400 font-bold mb-2">
              점수가 성공적으로 등록되었습니다! 🏆
            </div>
          )}

          <button
            onClick={resetGame}
            className="mt-4 w-full rounded-xl bg-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-500 transition-colors"
          >
            다시 시작하기
          </button>
        </div>
      )}

      {/* 🚀 실시간 리더보드 (TOP 5) */}
      <div className="mt-8 w-full max-w-md bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center justify-center gap-2">
          👑 명예의 전당 (TOP 5)
        </h3>
        <ul className="flex flex-col gap-3">
          {leaderboard.length === 0 ? (
            <li className="text-center text-gray-400">
              아직 등록된 점수가 없습니다.
            </li>
          ) : (
            leaderboard.map((record, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-slate-700 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold ${
                      index === 0 ? "text-yellow-400 text-lg" : "text-gray-300"
                    }`}
                  >
                    {index + 1}위
                  </span>
                  <span className="font-semibold">{record.name}</span>
                </div>
                <span className="font-mono text-cyan-300">
                  {record.score} pts
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
