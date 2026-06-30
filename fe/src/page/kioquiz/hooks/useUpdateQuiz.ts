import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuizApi } from "@/api/quiz.api";

export const useUpdateQuiz = (quizId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateQuizApi(quizId, formData),

    onSuccess: () => {
      // 🔄 상세 + 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      queryClient.invalidateQueries({ queryKey: ["quizList"] });
    },
  });
};
