export const checkAnswer = (
  selectedChoiceId: string[],
  correctChoiceId: string[]
): boolean => {
  // 길이가 다르면 무조건 오답
  if (selectedChoiceId.length !== correctChoiceId.length) {
    return false;
  }

  // 정렬 후 비교
  const sortedSelected = [...selectedChoiceId].sort();
  const sortedCorrect = [...correctChoiceId].sort();

  return sortedSelected.every((value, index) => value === sortedCorrect[index]);
};
