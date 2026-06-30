import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OlderGuide() {
  const imgList = ["/miryang/guide/1.png", "/miryang/guide/2.png"];

  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* 홈 버튼 (우상단) */}
      <button
        onClick={() => navigate("/quizlist")}
        className="
          absolute top-5 right-5 z-50
          px-6 py-3
          rounded-xl
          bg-white text-black
          text-lg font-bold
          shadow-lg
          active:scale-95
        "
      >
        처음으로
      </button>

      {/* 왼쪽 버튼 (2번째 이미지에서만) */}
      {index === 1 && (
        <button
          onClick={() => setIndex(0)}
          className="
            absolute left-5 top-1/2 -translate-y-1/2 z-50
            w-14 h-14
            rounded-full
            bg-white text-black
            text-2xl font-bold
            shadow-lg
            active:scale-95
          "
        >
          ◀
        </button>
      )}

      {/* 오른쪽 버튼 (1번째 이미지에서만) */}
      {index === 0 && (
        <button
          onClick={() => setIndex(1)}
          className="
            absolute right-5 top-1/2 -translate-y-1/2 z-50
            w-14 h-14
            rounded-full
            bg-white text-black
            text-2xl font-bold
            shadow-lg
            active:scale-95
          "
        >
          ▶
        </button>
      )}

      {/* 이미지 */}
      <img
        src={imgList[index]}
        alt="guide"
        className="w-full h-full object-contain"
      />

      {/* 하단 버튼 영역 */}
      <div
        className="
          absolute bottom-0 left-0
          w-full
          bg-white
          py-4
          flex justify-center gap-4
          z-40
        "
      >
        <button
          onClick={() => navigate("/quizlist")}
          className="
            px-8 py-4
            rounded-xl
            bg-gray-200 text-black
            text-lg font-bold
            shadow
            active:scale-95
          "
        >
          처음으로
        </button>

        <button
          onClick={() => navigate("/miryang/alzhemier")}
          className="
            px-8 py-4
            rounded-xl
            bg-blue-500 text-white
            text-lg font-bold
            shadow
            active:scale-95
          "
        >
          치매예방설문 하러가기
        </button>
      </div>
    </div>
  );
}
