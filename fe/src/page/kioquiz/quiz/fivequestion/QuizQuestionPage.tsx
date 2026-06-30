import { ProgressBar } from "../../component/common/ProgressBar";
import { useState } from "react";
import { type ChoicesType } from "../../types/ChoicesType";
import { ChoicesBoxText } from "../../component/common/ChoicesBoxText";
import { Toggle } from "../../component/common/Toggle";
import { AnswerModal } from "../../component/common/AnswerModal";
import { quizSet } from "../../data/testData";
import { usePageTransition } from "../../hooks/usePageTransition";
import { pageTransitionClass } from "../../utils/pageTransitionClass";
import { QuizResultPage } from "./QuizQuestionResultPage";
type QuizPageProps = {
  handleHomeClick: () => void;
};
export const QuizQuestionPage = ({ handleHomeClick }: QuizPageProps) => {
  const [showResult, setShowResult] = useState(false);
  // const choicesList = [["1",2"],["3"],["1"]]; 이런식으로 사용자가 선택한 뭐시기
  // 그리고 사용자가 답 고르고 해설 바로보기 터글 선택했으면
  // 바로바로 questions[currentIndex]의 answers 리스트와
  // choiceList[currentIndex]의 값을 비교해서
  // 정답인지 오답인지 판별 후 모달로 보여주기

  // 그리고 만약 해설 바로보기 토글을 선택 안했다면
  // 결과보기를 누른 후
  // choiceList와 qustions.answers를 비교하여
  // 해설 보여주기
  const { phase, leave } = usePageTransition(300);
  const questions = quizSet.questions; // 퀴즈

  const total = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerPreview, setAnswerPreview] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});

  const currentQuestion = questions[currentIndex]; // 현재문제
  const selectedIds = userAnswers[currentQuestion.id] ?? []; //현재문제에서 고른정답
  const handleSelectChoice = (choice: ChoicesType) => {
    const qId = currentQuestion.id;
    console.log("choice.id:", choice.id);
    setUserAnswers((prev) => {
      const prevAnswers = prev[qId] ?? [];

      const nextAnswers = prevAnswers.includes(choice.id)
        ? prevAnswers.filter((id) => id !== choice.id) // 이미 있으면 제거
        : [...prevAnswers, choice.id]; // 없으면 추가

      return {
        ...prev,
        [qId]: nextAnswers,
      };
    });
    console.log(qId, "번 체크한 답", "", userAnswers);
  };

  const goNext = () => {
    if (currentIndex === total - 1) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (answerPreview) {
      setAnswerModal(true);
      return;
    }
    goNext();
  };
  const isQuestionCorrect =
    selectedIds.length === currentQuestion.answers.length &&
    selectedIds.every((id) => currentQuestion.answers.includes(id));

  if (showResult) {
    return (
      <QuizResultPage
        userAnswers={userAnswers}
        handleHomeClick={handleHomeClick}
      />
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col items-center px-6 py-6 text-white ${pageTransitionClass(
        phase,
      )} transition-all duration-500 ease-in-out`}
    >
      {/* 문제 번호 */}
      <div
        role="button"
        onClick={() => leave(handleHomeClick)}
        className="
    absolute top-4 left-4
    text-2xl font-bold
    text-white/80
    hover:text-white
    transition-colors
    select-none
  "
        aria-label="뒤로가기"
      >
        &lt;
      </div>
      <div className="mb-3">
        <span className="px-4 py-1 text-sm rounded-full border border-white/50">
          문제 {currentIndex + 1}/{total}
        </span>
      </div>
      {/* 문제 번호 + 토글 */}
      <div className="w-full flex items-center justify-between mb-3">
        <span className="px-4 py-1 text-sm rounded-full border border-white/50">
          문제 {currentIndex + 1}/{total}
        </span>

        <Toggle checked={answerPreview} setChecked={setAnswerPreview} />
      </div>

      <ProgressBar current={currentIndex + 1} total={total} />
      {/* 질문 카드 */}
      <div className="w-full bg-white text-black rounded-xl px-4 py-5 mb-6 shadow-md text-center font-semibold">
        {currentQuestion.question}
      </div>
      {currentQuestion.image && (
        <div className="w-full mb-6 rounded-xl overflow-hidden shadow-lg">
          <img
            src={currentQuestion.image}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* 선택지 */}
      <div className="w-full grid grid-cols-2 gap-4">
        {currentQuestion.choices.map((choice) => {
          const isSelected = selectedIds.includes(choice.id);

          return (
            <button
              key={choice.id}
              onClick={() => handleSelectChoice(choice)}
              className={`
                rounded-xl
                shadow-lg shadow-black/20
                transition-all duration-200
                active:scale-95
                overflow-hidden
                ${
                  isSelected
                    ? "ring-4 ring-[#6EA8C1] scale-[1.02]"
                    : "opacity-90"
                }
              `}
            >
              {/* 이미지 */}
              {choice.image && (
                <div className="h-28 bg-gray-200">
                  <img src={choice.image} className="w-full h-full" />
                </div>
              )}

              {/* 텍스트 */}
              {choice.image ? (
                <div
                  className={`py-3 font-semibold text-center rounded-b-xl ${
                    isSelected
                      ? "bg-[#6EA8C1] text-white"
                      : "bg-[#6EA8C1]/55 text-white"
                  }`}
                >
                  {choice.label}
                </div>
              ) : (
                <ChoicesBoxText label={choice.label} />
              )}
            </button>
          );
        })}
      </div>
      {/* 이전 / 다음 버튼 */}
      {/* 이전 / 다음 버튼 */}
      <div className="w-full flex gap-4 mt-auto pt-6">
        {/* 이전 */}
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="
      flex-1
      py-4
      rounded-xl
      border
      border-white/40
      text-white
      font-semibold
      transition
      active:scale-95
      disabled:opacity-40
    "
          disabled={currentIndex === 0}
        >
          이전 문제
        </button>

        {/* 다음 */}
        <button
          onClick={handleNextQuestion}
          disabled={selectedIds.length === 0}
          className="
      flex-1
      py-4
      rounded-xl
      bg-[#6EA8C1]
      text-white
      font-semibold
      shadow-lg
      transition
      active:scale-95
    "
        >
          {currentIndex === total - 1 ? "결과 보기" : "다음 문제"}
        </button>
      </div>

      {/* <button
        onClick={() => {
          setCurrent(current - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setCurrent(current + 1);
        }}
      >
        +
      </button> */}
      {answerModal && (
        <AnswerModal
          currentIndex={currentIndex}
          total={total}
          isCorrect={isQuestionCorrect}
          explanation={currentQuestion.description}
          setAnswerModal={setAnswerModal}
          handleNextQuestion={goNext}
        />
      )}
    </div>
  );
};
