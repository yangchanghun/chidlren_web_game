import { quizSet } from "../../data/testData";

type ResultPageProps = {
  userAnswers: Record<number, number[]>;
  handleHomeClick?: () => void;
};

export const QuizResultPage = ({
  userAnswers,
  handleHomeClick,
}: ResultPageProps) => {
  const questions = quizSet.questions;

  const results = questions.map((q) => {
    const selected = userAnswers[q.id] ?? [];
    const isCorrect =
      selected.length === q.answers.length &&
      selected.every((id) => q.answers.includes(id));

    return {
      ...q,
      selected,
      isCorrect,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="flex-1 flex flex-col  overflow-y-auto">
      <div className="flex-1 px-6 py-8 text-white">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-center mb-6">퀴즈 결과</h1>

        {/* 점수 카드 */}
        <div className="bg-white text-black rounded-xl p-6 mb-8 text-center shadow-lg">
          <p className="text-lg font-semibold mb-2">총 점수</p>
          <p className="text-3xl font-bold text-[#6EA8C1]">
            {correctCount} / {questions.length}
          </p>
        </div>

        {/* 문제별 결과 */}
        <div className="space-y-6">
          {results.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white text-black rounded-xl p-5 shadow-md"
            >
              {/* 문제 번호 + 정오답 */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">문제 {idx + 1}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    q.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {q.isCorrect ? "정답" : "오답"}
                </span>
              </div>

              {/* 질문 */}
              <p className="font-semibold mb-3">{q.question}</p>

              {/* 이미지 */}
              {q.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={q.image}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* 내가 고른 답 */}
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  내가 선택한 답
                </p>
                <div className="flex flex-wrap gap-2">
                  {q.selected.map((id) => {
                    const choice = q.choices.find((c) => c.id === id);
                    return (
                      <span
                        key={id}
                        className="px-3 py-1 rounded-full bg-gray-200 text-sm"
                      >
                        {choice?.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 정답 */}
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-500 mb-1">정답</p>
                <div className="flex flex-wrap gap-2">
                  {q.answers.map((id) => {
                    const choice = q.choices.find((c) => c.id === id);
                    return (
                      <span
                        key={id}
                        className="px-3 py-1 rounded-full bg-[#6EA8C1] text-white text-sm"
                      >
                        {choice?.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 해설 */}
              {q.description && (
                <div className="bg-gray-100 rounded-lg p-3 text-sm whitespace-pre-line">
                  {q.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <div className="mt-10 flex gap-4">
          <button
            onClick={handleHomeClick}
            className="flex-1 py-4 rounded-xl border border-white/40 font-semibold active:scale-95"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};
