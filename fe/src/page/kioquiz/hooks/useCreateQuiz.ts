import { useMutation } from "@tanstack/react-query";
import { createQuizApi } from "@/api/quiz.api";

export function useCreateQuiz() {
  return useMutation({
    mutationFn: (formData: FormData) => createQuizApi(formData),
  });
}
