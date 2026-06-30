import axios from "axios";

export const useDeleteQuiz = () => {
  const token = localStorage.getItem("token");
  const mutate = async (quizId: number) => {
    return axios.delete(
      `https://kioquiz.kioedu.co.kr/api/quizzes/${quizId}/delete/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      },
    );
  };

  return { mutate };
};
