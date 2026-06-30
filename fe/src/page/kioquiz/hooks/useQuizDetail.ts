import { useQuery } from "@tanstack/react-query";
import { fetchQuizDetail } from "@/api/quiz.api";

export function useQuizDetail(quizId: number) {
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => fetchQuizDetail(quizId),
    enabled: !!quizId,
  });
}
