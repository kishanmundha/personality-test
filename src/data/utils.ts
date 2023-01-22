export const getResultId = (answerIds: number[]) => {
  const avg = Math.round(answerIds.reduce((a, b) => a + b) / answerIds.length);

  if (avg === 1) return 1;
  if (avg === 2) return 2;
  if (avg === 3) return 3;
  return 4;
};
