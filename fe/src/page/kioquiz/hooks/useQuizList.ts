import { useQuery } from "@tanstack/react-query";
import { fetchQuizList } from "@/api/quiz.api";

export function useQuizList() {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizList,
  });
}
