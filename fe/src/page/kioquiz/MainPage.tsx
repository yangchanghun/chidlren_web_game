import { useState } from "react";

import { DemoPage } from "./component/common/DemoComponent";
import { QuizQuestionPage } from "./quiz/fivequestion/QuizQuestionPage";

export default function MainPage() {
  const [status, setStatus] = useState<"home" | "login" | "demo" | "quiz">(
    "demo",
  );

  const handleHomeClick = () => {
    setStatus("demo");
  };

  const handleTestQuizClick = () => {
    setStatus("quiz");
  };

  return (
    <div className="flex-1 flex flex-col  overflow-y-auto">
      {status === "demo" && (
        <DemoPage
          handleHomeClick={handleHomeClick}
          handleTestQuizClick={handleTestQuizClick}
        />
      )}

      {status === "quiz" && (
        <QuizQuestionPage handleHomeClick={handleHomeClick} />
      )}
    </div>
  );
}
