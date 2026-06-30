type AnswerModalProps = {
  setAnswerModal: (value: boolean) => void;
  isCorrect: boolean;
  explanation: string | undefined;
  handleNextQuestion: () => void;
  currentIndex: number;
  total: number;
};

export const AnswerModal = ({
  setAnswerModal,
  isCorrect,
  explanation,
  handleNextQuestion,
  currentIndex,
  total,
}: AnswerModalProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 12,
            color: isCorrect ? "#4CAF81" : "#E05A4F",
          }}
        >
          {isCorrect ? "정답입니다 🎉" : "오답입니다"}
        </div>

        <div
          style={{
            background: "#f1f1f1",
            color:"#333",
            fontSize: 16,
            fontWeight:"800",            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            whiteSpace: "pre-line",
          }}
        >
          {explanation}
        </div>

        <button
          onClick={() => {
            setAnswerModal(false);
            handleNextQuestion();
          }}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 14,
            background: "#6EA8C1",
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            border: "none",
          }}
        >
          {currentIndex === total - 1 ? "결과 보기" : "다음 문제"}
        </button>
      </div>
    </div>
  );
};
