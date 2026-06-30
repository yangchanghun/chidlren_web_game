import { useLocation, useNavigate } from "react-router-dom";

export default function SleepResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score: number = state?.totalScore ?? 0;

  const level = score <= 7 ? "normal" : score <= 14 ? "warning" : "danger";

  const TEXT = {
    normal: "현재 수면 상태는 정상 범위입니다 🌙",
    warning: "경미한 수면 문제가 의심됩니다 ⚠️",
    danger: "수면장애 가능성이 높습니다 🚨",
  };

  const COLOR = {
    normal: "bg-green-500",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white flex flex-col items-center px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">수면 자가진단 결과</h2>

      <p className="text-2xl mb-4">
        총점 <span className="font-bold">{score}</span>점
      </p>

      <div
        className={`w-full max-w-xl rounded-2xl p-6 text-2xl font-bold text-center ${COLOR[level]}`}
      >
        {TEXT[level]}
      </div>

      <div className="mt-8 max-w-xl text-lg space-y-4">
        {level !== "normal" && (
          <p>
            수면 습관 점검과 함께
            <strong className="text-yellow-300">전문가 상담</strong>을 고려해
            보세요.
          </p>
        )}
        <p>
          정신건강 상담 ☎ <strong>1577-0199</strong>
        </p>
      </div>

      <button
        onClick={() => navigate("/olderperson")}
        className="mt-10 px-10 py-4 bg-blue-500 rounded-2xl text-xl font-bold"
      >
        처음으로
      </button>

      <p className="mt-8 text-sm text-white/70 text-center max-w-xl">
        ※ 본 결과는 자가진단용이며 정확한 진단은 전문 상담이 필요합니다.
      </p>
    </div>
  );
}
