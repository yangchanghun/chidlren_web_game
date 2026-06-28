import React, { useState, useEffect, useRef } from "react";

// --- 환경 설정 ---
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SPEED = 8;
const BULLET_SPEED = 12;
const BASE_PLANET_SPEED = 2;
const PLANET_SPAWN_INTERVAL_BASE = 1500; // ms

interface GameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Bullet extends GameObject {}
interface Planet extends GameObject {
  speed: number;
}

interface GameState {
  playerX: number;
  bullets: Bullet[];
  planets: Planet[];
  score: number;
  combo: number;
  level: number;
  lives: number;
  gameOver: boolean;
  isPaused: boolean;
  lastSpawnTime: number; // 💡 useRef에서 State로 이동
  planetIdCounter: number; // 💡 useRef에서 State로 이동
}

// --- 시각적 컴포넌트 ---
const CompanyLogo: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-yellow-600 shadow-inner">
    <span className="text-[10px] font-bold text-gray-800">LOGO</span>
  </div>
);

const CoinPlanet: React.FC<{ planet: Planet }> = ({ planet }) => (
  <div
    className="absolute rounded-full bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center shadow-lg"
    style={{
      left: planet.x,
      top: planet.y,
      width: planet.width,
      height: planet.height,
    }}
  >
    <CompanyLogo />
  </div>
);

const PlayerShip: React.FC<{ x: number }> = ({ x }) => (
  <div className="absolute bottom-4 flex flex-col items-center" style={{ left: x, width: 60, height: 60 }}>
    <div className="w-8 h-12 bg-blue-500 rounded-t-full shadow-md"></div>
    <div className="absolute bottom-0 w-16 h-4 bg-blue-700 rounded-sm"></div>
    <div className="absolute -bottom-2 flex space-x-2">
      <div className="w-2 h-4 bg-orange-500 rounded-b-full animate-pulse"></div>
      <div className="w-2 h-4 bg-orange-500 rounded-b-full animate-pulse"></div>
    </div>
  </div>
);

const LaserBullet: React.FC<{ bullet: Bullet }> = ({ bullet }) => (
  <div
    className="absolute bg-cyan-400 rounded-full shadow-cyan-500/50 shadow-md"
    style={{
      left: bullet.x,
      top: bullet.y,
      width: bullet.width,
      height: bullet.height,
    }}
  ></div>
);

// --- 메인 게임 컴포넌트 ---
const ShootingGamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerX: GAME_WIDTH / 2 - 30,
    bullets: [],
    planets: [],
    score: 0,
    combo: 0,
    level: 1,
    lives: 3,
    gameOver: false,
    isPaused: true,
    lastSpawnTime: Date.now(), // 💡 초기화
    planetIdCounter: 0, // 💡 초기화
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const gameLoopId = useRef<number>(0);

  // 게임 루프 (requestAnimationFrame)
  useEffect(() => {
    const gameTick = () => {
      setGameState((prev) => {
        if (prev.isPaused || prev.gameOver) return prev;

        // 1. 플레이어 이동
        let newPlayerX = prev.playerX;
        if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) newPlayerX -= PLAYER_SPEED;
        if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) newPlayerX += PLAYER_SPEED;
        newPlayerX = Math.max(0, Math.min(GAME_WIDTH - 60, newPlayerX));

        // 2. 총알 이동
        const movedBullets = prev.bullets.map((b) => ({ ...b, y: b.y - BULLET_SPEED })).filter((b) => b.y > -20);

        // 3. 행성 이동 및 바닥 충돌 판정
        let livesLost = 0;
        const currentPlanetSpeed = BASE_PLANET_SPEED + (prev.level - 1) * 0.5;
        const movedPlanets = prev.planets
          .map((p) => ({ ...p, y: p.y + currentPlanetSpeed }))
          .filter((p) => {
            if (p.y > GAME_HEIGHT) {
              livesLost++;
              return false;
            }
            return true;
          });

        let newLives = prev.lives - livesLost;
        let newGameOver = newLives <= 0;
        let newCombo = livesLost > 0 ? 0 : prev.combo;
        let newLevel = livesLost > 0 ? 1 : prev.level;

        // 4. 총알 - 행성 충돌 판정 (Set을 이용해 정확한 파괴 처리)
        const destroyedBullets = new Set<number>();
        const destroyedPlanets = new Set<number>();
        let hitCount = 0;

        movedBullets.forEach((bullet) => {
          movedPlanets.forEach((planet) => {
            if (destroyedBullets.has(bullet.id) || destroyedPlanets.has(planet.id)) return;

            // 충돌 감지 로직 (AABB)
            if (
              bullet.x < planet.x + planet.width &&
              bullet.x + bullet.width > planet.x &&
              bullet.y < planet.y + planet.height &&
              bullet.y + bullet.height > planet.y
            ) {
              destroyedBullets.add(bullet.id);
              destroyedPlanets.add(planet.id);
              hitCount++;
            }
          });
        });

        const survivingBullets = movedBullets.filter((b) => !destroyedBullets.has(b.id));
        const survivingPlanets = movedPlanets.filter((p) => !destroyedPlanets.has(p.id));

        let newScore = prev.score;
        if (hitCount > 0) {
          newScore += hitCount * 10 * newLevel;
          newCombo += hitCount;
          newLevel = Math.floor(newCombo / 10) + 1;
        }

        // 5. 새 행성 스폰 로직 (💡 순수 함수 형태로 변경)
        const currentSpawnInterval = Math.max(300, PLANET_SPAWN_INTERVAL_BASE - (newLevel - 1) * 100);
        let finalPlanets = [...survivingPlanets];
        let newLastSpawnTime = prev.lastSpawnTime;
        let newPlanetIdCounter = prev.planetIdCounter;

        if (Date.now() - prev.lastSpawnTime > currentSpawnInterval) {
          finalPlanets.push({
            id: prev.planetIdCounter,
            x: Math.random() * (GAME_WIDTH - 50),
            y: -50,
            width: 50,
            height: 50,
            speed: currentPlanetSpeed,
          });
          newLastSpawnTime = Date.now();
          newPlanetIdCounter = prev.planetIdCounter + 1;
        }

        return {
          ...prev,
          playerX: newPlayerX,
          bullets: survivingBullets,
          planets: finalPlanets,
          lives: newLives,
          gameOver: newGameOver,
          combo: newCombo,
          level: newLevel,
          score: newScore,
          lastSpawnTime: newLastSpawnTime, // 💡 업데이트 반영
          planetIdCounter: newPlanetIdCounter, // 💡 업데이트 반영
        };
      });

      gameLoopId.current = requestAnimationFrame(gameTick);
    };

    gameLoopId.current = requestAnimationFrame(gameTick);
    return () => {
      if (gameLoopId.current) cancelAnimationFrame(gameLoopId.current);
    };
  }, []);

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;

      if (e.key === " ") {
        setGameState((prev) => {
          if (prev.isPaused || prev.gameOver) return prev;
          return {
            ...prev,
            bullets: [
              ...prev.bullets,
              {
                id: Date.now(),
                x: prev.playerX + 28,
                y: GAME_HEIGHT - 80,
                width: 4,
                height: 16,
              },
            ],
          };
        });
      }

      if (e.key === "p" || e.key === "P") {
        setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
      }

      if ((e.key === "r" || e.key === "R") && gameState.gameOver) {
        setGameState({
          playerX: GAME_WIDTH / 2 - 30,
          bullets: [],
          planets: [],
          score: 0,
          combo: 0,
          level: 1,
          lives: 3,
          gameOver: false,
          isPaused: false,
          lastSpawnTime: Date.now(), // 💡 리셋 시 타이머도 초기화
          planetIdCounter: 0,
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState.gameOver]);

  // 마우스 클릭 시 발사
  const handleClick = () => {
    setGameState((prev) => {
      if (prev.isPaused || prev.gameOver) return prev;
      return {
        ...prev,
        bullets: [
          ...prev.bullets,
          {
            id: Date.now(),
            x: prev.playerX + 28,
            y: GAME_HEIGHT - 80,
            width: 4,
            height: 16,
          },
        ],
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-4 font-sans select-none">
      <header className="w-full max-w-7xl flex items-center justify-between pb-6 border-b border-gray-800 mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Coin Planet <span className="text-yellow-400">Shooter</span>
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>조작: [A/D] 또는 [←/→] 이동 • [스페이스바] 또는 클릭 발사 • [P] 일시정지</span>
        </div>
      </header>

      <div className="w-full max-w-[800px] grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
        <div className="text-center p-3 bg-gray-950 rounded-xl border border-gray-700">
          <div className="text-xs text-gray-500 uppercase font-semibold">점수</div>
          <div className="text-3xl font-bold text-cyan-400 tabular-nums">{gameState.score.toLocaleString()}</div>
        </div>
        <div className="text-center p-3 bg-gray-950 rounded-xl border border-gray-700 relative overflow-hidden">
          <div className="text-xs text-gray-500 uppercase font-semibold">콤보 (연승)</div>
          <div className="text-3xl font-bold text-yellow-400 tabular-nums">{gameState.combo}x</div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-yellow-500 transition-all duration-300"
            style={{ width: `${(gameState.combo % 10) * 10}%` }}
          ></div>
        </div>
        <div className="text-center p-3 bg-gray-950 rounded-xl border border-gray-700">
          <div className="text-xs text-gray-500 uppercase font-semibold">난이도 (레벨)</div>
          <div className="text-3xl font-bold text-orange-400 tabular-nums">Lv. {gameState.level}</div>
        </div>
        <div className="text-center p-3 bg-gray-950 rounded-xl border border-gray-700 flex flex-col items-center justify-center">
          <div className="text-xs text-gray-500 uppercase font-semibold mb-1">생명력</div>
          <div className="flex space-x-1.5 text-2xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={i < gameState.lives ? "text-red-500" : "text-gray-700"}>
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative bg-gray-900 rounded-2xl border-4 border-gray-800 shadow-2xl overflow-hidden cursor-crosshair"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onClick={handleClick}
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3,
                height: Math.random() * 3,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            ></div>
          ))}
        </div>

        {gameState.planets.map((planet) => (
          <CoinPlanet key={planet.id} planet={planet} />
        ))}
        {gameState.bullets.map((bullet) => (
          <LaserBullet key={bullet.id} bullet={bullet} />
        ))}
        <PlayerShip x={gameState.playerX} />

        {(gameState.isPaused || gameState.gameOver) && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-10 text-center">
            {gameState.gameOver ? (
              <>
                <h2 className="text-6xl font-extrabold text-red-500 mb-4 animate-pulse">GAME OVER</h2>
                <p className="text-xl text-gray-300 mb-8">
                  방어가 뚫렸습니다! 최종 점수:{" "}
                  <strong className="text-cyan-400">{gameState.score.toLocaleString()}</strong> (Lv. {gameState.level})
                </p>
                <button
                  onClick={() =>
                    setGameState({
                      playerX: GAME_WIDTH / 2 - 30,
                      bullets: [],
                      planets: [],
                      score: 0,
                      combo: 0,
                      level: 1,
                      lives: 3,
                      gameOver: false,
                      isPaused: false,
                      lastSpawnTime: Date.now(), // 💡 리셋 시 타이머도 초기화
                      planetIdCounter: 0,
                    })
                  }
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  다시 시작하기 [R]
                </button>
              </>
            ) : gameState.isPaused ? (
              <>
                <h2 className="text-5xl font-bold text-gray-100 mb-6">일시 정지</h2>
                <p className="text-lg text-gray-400 mb-10">코인 행성들이 기다리고 있습니다.</p>
                <button
                  onClick={() => setGameState((prev) => ({ ...prev, isPaused: false, lastSpawnTime: Date.now() }))} // 💡 재개 시 즉시 쏟아지는 것 방지
                  className="px-10 py-4 bg-gray-100 text-gray-950 font-bold rounded-full text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  게임 계속하기 [P]
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShootingGamePage;
