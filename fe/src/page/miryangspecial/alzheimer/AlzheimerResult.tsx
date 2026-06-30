import { useLocation, useNavigate } from "react-router-dom";

export default function AlzheimerResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score: number = state?.totalScore ?? 0;

  const level = score <= 3 ? "good" : score <= 9 ? "warning" : "danger";

  const MESSAGE = {
    good: "현재 치매 가능성은 낮아 보입니다 😊",
    warning: "경도 인지 장애가 의심됩니다 ⚠️",
    danger: "치매 가능성이 매우 높습니다 🚨",
  };

  const COLOR = {
    good: "bg-green-500",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">치매 선별 검사 결과</h2>

      <div className="text-2xl mb-4">
        총점 <span className="font-bold">{score}</span> 점
      </div>

      <div
        className={`w-full max-w-xl rounded-2xl p-6 text-2xl font-bold text-center ${COLOR[level]}`}
      >
        {MESSAGE[level]}
      </div>

      <div className="mt-8 max-w-xl text-lg space-y-3">
        <p>
          기억력 저하가 지속되거나 악화된다면
          <strong className="text-yellow-300">전문의 상담</strong>을 권장합니다.
        </p>
        <p>
          치매상담센터 ☎ <strong>1588-0678</strong>
        </p>
      </div>

      <button
        onClick={() => navigate("/quizlist")}
        className="mt-10 px-10 py-4 bg-blue-500 rounded-2xl text-xl font-bold"
      >
        처음으로
      </button>
    </div>
  );
}
