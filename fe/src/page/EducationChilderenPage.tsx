import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

// --- 타입 정의 및 목업 데이터 ---
type CardType = "safe" | "danger";

interface CardData {
  id: string;
  type: CardType;
  imageUrl: string;
  isCorrect: boolean;
}

interface ConfettiData {
  id: number;
  big: boolean;
}

const INITIAL_CARDS: CardData[] = [
  { id: "card-1", type: "safe", imageUrl: "/card/image_1.png", isCorrect: false },
  { id: "card-2", type: "danger", imageUrl: "/card/image_2.png", isCorrect: false },
  { id: "card-3", type: "safe", imageUrl: "/card/image_3.png", isCorrect: false },
  { id: "card-4", type: "danger", imageUrl: "/card/image_4.png", isCorrect: false },
];

// --- 폭죽 컴포넌트 ---
const ConfettiBurst = ({ big }: { big: boolean }) => {
  const colors = ["#ff4d4d", "#ffd93d", "#6bcb77", "#4d96ff", "#b983ff", "#ff8fab"];
  const count = big ? 90 : 40;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {Array.from({ length: count }).map((_, index) => {
        const angle = Math.random() * 360;
        const distance = big ? 250 + Math.random() * 260 : 120 + Math.random() * 180;
        const size = big ? 8 + Math.random() * 10 : 6 + Math.random() * 8;
        const duration = big ? 1200 + Math.random() * 900 : 900 + Math.random() * 600;

        const style: CSSProperties = {
          left: "50%",
          top: "45%",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: colors[index % colors.length],
          borderRadius: Math.random() > 0.5 ? "9999px" : "2px",
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `confetti-pop ${duration}ms ease-out forwards`,
          ["--angle" as string]: `${angle}deg`,
          ["--distance" as string]: `${distance}px`,
        };

        return <span key={index} className="absolute block" style={style} />;
      })}

      <style>{`
        @keyframes confetti-pop {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              rotate(var(--angle))
              translate(var(--distance))
              translateY(180px)
              rotate(720deg)
              scale(0.4);
          }
        }
      `}</style>
    </div>
  );
};

// --- 1. 원본 카드 컴포넌트 ---
const DraggableCard = ({ card }: { card: CardData }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card.id,
    data: { type: card.type, cardData: card },
  });

  if (card.isCorrect) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`touch-none select-none cursor-grab active:cursor-grabbing transition-opacity duration-200 ${
        isDragging ? "opacity-30" : "opacity-100 hover:scale-105"
      }`}
    >
      <img
        src={card.imageUrl}
        alt="상황 카드"
        className="w-[70px] h-[95px] sm:w-[90px] sm:h-[120px] landscape:w-[60px] landscape:h-[80px] md:landscape:w-[120px] md:landscape:h-[160px] object-contain rounded-xl md:rounded-2xl shadow-md border-2 md:border-4 border-white bg-white pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

// --- 2. 드롭 가능한 바구니 ---
const DroppableZone = ({ id, type, imageUrl }: { id: string; type: CardType; imageUrl: string }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const activeStyles = {
    safe: isOver ? "bg-green-300 scale-105" : "bg-green-100",
    danger: isOver ? "bg-red-300 scale-105" : "bg-red-100",
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 flex flex-col items-center justify-center p-2 md:p-4 rounded-2xl md:rounded-3xl transition-all duration-300 ease-in-out border-4 border-dashed shadow-inner min-h-[120px] md:min-h-[200px] ${
        type === "safe" ? "border-green-400 " + activeStyles.safe : "border-red-400 " + activeStyles.danger
      }`}
    >
      <img
        src={imageUrl}
        alt={`${type === "safe" ? "안전" : "위험"} 바구니`}
        className="w-[70px] h-[70px] landscape:w-[50px] landscape:h-[50px] md:landscape:w-[120px] md:landscape:h-[120px] sm:w-[90px] sm:h-[90px] md:w-[140px] md:h-[140px] object-contain drop-shadow-md mb-1 md:mb-2 pointer-events-none"
        draggable={false}
      />
      <span className="text-base landscape:text-sm md:landscape:text-2xl md:text-2xl font-bold text-gray-700 whitespace-nowrap">
        {type === "safe" ? "🟢 안전" : "🔴 위험"}
      </span>
    </div>
  );
};

// --- 메인 컴포넌트 ---
export default function EducationChilderenPage() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [message, setMessage] = useState<string>("카드를 바구니에 넣어주세요!");
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  const [confettiList, setConfettiList] = useState<ConfettiData[]>([]);
  const [showRetryButton, setShowRetryButton] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  useEffect(() => {
    return () => {
      timerRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const addTimer = (callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    timerRef.current.push(timer);
  };

  const fireConfetti = (big = false) => {
    const id = Date.now() + Math.random();

    setConfettiList((prev) => [...prev, { id, big }]);

    addTimer(
      () => {
        setConfettiList((prev) => prev.filter((item) => item.id !== id));
      },
      big ? 2200 : 1600,
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardData = active.data.current?.cardData;

    if (cardData) {
      setActiveCard(cardData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);

    const { active, over } = event;

    if (!over) return;

    const draggedCardType = active.data.current?.type;
    const droppedZoneId = over.id;

    if (draggedCardType === droppedZoneId) {
      setCards((prev) => prev.map((card) => (card.id === active.id ? { ...card, isCorrect: true } : card)));

      setMessage("참 잘했어요! 👏");
      setShowRetryButton(false);

      // 맞출 때마다 폭죽
      fireConfetti(false);

      const remaining = cards.filter((card) => card.id !== active.id && !card.isCorrect).length;

      if (remaining === 0) {
        addTimer(() => {
          setMessage("🎉 모든 분류 완료! 최고! 🎉");
        }, 300);

        // 전체 클리어 시 큰 폭죽 한 번 더
        addTimer(() => {
          fireConfetti(true);
        }, 500);

        // 3초 뒤 다시하기 버튼 표시
        addTimer(() => {
          setShowRetryButton(true);
        }, 3000);
      }
    } else {
      setMessage("다시 한번 생각해 볼까요? 🤔");
    }
  };

  const handleRetry = () => {
    timerRef.current.forEach((timer) => clearTimeout(timer));
    timerRef.current = [];

    setCards(INITIAL_CARDS);
    setMessage("카드를 바구니에 넣어주세요!");
    setActiveCard(null);
    setConfettiList([]);
    setShowRetryButton(false);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen landscape:h-[100dvh] bg-blue-50 font-sans p-3 sm:p-4 md:p-8 flex flex-col landscape:flex-row md:flex-row gap-3 md:gap-8 justify-center items-stretch max-w-6xl mx-auto landscape:overflow-hidden">
        {/* 좌측 영역 */}
        <div className="flex-[2] flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-6 relative overflow-hidden">
          <h1 className="text-lg landscape:text-base md:landscape:text-3xl md:text-3xl font-extrabold text-blue-600 mb-2 md:mb-6 text-center shrink-0">
            교통안전 분류 게임 🚦
          </h1>

          <div className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-3 md:mb-6 bg-yellow-50 p-2 md:p-4 rounded-xl md:rounded-2xl border-2 border-yellow-200 shrink-0">
            <div className="font-bold text-yellow-800 text-xs sm:text-sm md:text-lg text-center">{message}</div>

            {showRetryButton && (
              <button
                onClick={handleRetry}
                className="mt-1 md:mt-2 px-5 py-2 md:px-7 md:py-3 rounded-full bg-blue-500 text-white text-sm md:text-lg font-extrabold shadow-md hover:bg-blue-600 active:scale-95 transition-all"
              >
                다시하기 🔄
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-wrap justify-center items-start gap-2 sm:gap-4 p-3 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-gray-100 min-h-[150px] overflow-y-auto">
            {cards.map((card) => (
              <DraggableCard key={card.id} card={card} />
            ))}

            {cards.every((card) => card.isCorrect) && (
              <div className="flex items-center justify-center w-full h-full text-lg md:text-2xl font-bold text-green-500 animate-bounce">
                미션 완료! 🚀
              </div>
            )}
          </div>
        </div>

        {/* 우측 영역 */}
        <div className="flex-[1] flex flex-row landscape:flex-col md:flex-col gap-3 w-full shrink-0 landscape:max-w-[150px] md:landscape:max-w-[300px] md:max-w-[300px]">
          <DroppableZone id="safe" type="safe" imageUrl="/card/safe.png" />
          <DroppableZone id="danger" type="danger" imageUrl="/card/danger.png" />
        </div>
      </div>

      {/* 드래그 중인 카드 */}
      <DragOverlay dropAnimation={null}>
        {activeCard ? (
          <div className="scale-110 rotate-3 shadow-2xl opacity-95">
            <img
              src={activeCard.imageUrl}
              alt="드래그 중인 카드"
              className="w-[70px] h-[95px] sm:w-[90px] sm:h-[120px] landscape:w-[60px] landscape:h-[80px] md:landscape:w-[120px] md:landscape:h-[160px] object-contain rounded-xl md:rounded-2xl border-4 border-blue-400 bg-white"
            />
          </div>
        ) : null}
      </DragOverlay>

      {/* 폭죽 */}
      {confettiList.map((confetti) => (
        <ConfettiBurst key={confetti.id} big={confetti.big} />
      ))}
    </DndContext>
  );
}
