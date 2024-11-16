export default function calculateResults(correctAnswers, submittedAnswers) {
  let totalCorrect = 0;
  let totalWrong = 0;

  // Map through submitted answers and compare with correct answers
  submittedAnswers.forEach((submitted) => {
    const correct = correctAnswers.find(
      (item) => item.question_id === submitted.question_id
    );

    if (correct && correct.answer === submitted.answer) {
      totalCorrect++;
    } else {
      totalWrong++;
    }
  });

  return {
    totalCorrect,
    totalWrong,
  };
}
