import { usePageTransition } from "../../hooks/usePageTransition";
import { pageTransitionClass } from "../../utils/pageTransitionClass";
type DemoPageProps = {
  onSelectQuiz?: (quizId: string) => void;
  handleHomeClick: () => void;
  handleTestQuizClick: () => void;
};

export const DemoPage = ({
  handleHomeClick,
  handleTestQuizClick,
}: DemoPageProps) => {
  const { phase, leave } = usePageTransition(300);

  return (
    <div
      className={`flex-1 flex flex-col items-center px-6 py-6 text-white ${pageTransitionClass(
        phase,
      )} transition-all duration-500 ease-in-out`}
    >
      {/* 타이틀 */}

      <h1 className="text-2xl font-bold mb-6 tracking-widest">퀴즈데모버전</h1>

      {/* 퀴즈 그리드 */}
      <div
        className="
    w-full
    grid
    [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
    gap-4
  "
      >
        <button
          onClick={() => handleTestQuizClick()}
          className="
          w-[130px]
          h-[140px]
          bg-white
          rounded-2xl
          shadow-lg
          flex
          flex-col
          items-center
          justify-between
          p-3
          active:scale-95
          transition-transform
          mb-4
          mr-4"
        >
          <div
            className="                             
                  w-full
                h-[100px]
                bg-gray-200
                rounded-xl
                flex
                items-center
                justify-center
                text-gray-500
                text-sm
                font-semibold
                overflow-hidden"
          >
            <img src={"in.png"} className="w-full h-full object-cover" />
          </div>

          <span className="text-sm font-semibold text-black text-center">
            체험하기
          </span>

          {/* <span className="text-sm font-semibold text-black text-center">
                  {quiz.title}
                </span> */}
        </button>
      </div>
    </div>
  );
};
