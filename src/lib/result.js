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

function calculateResultPercentage(total, correct, wrong) {
  if (total <= 0) return 0; // Avoid division by zero
  const unanswered = total - (correct + wrong);
  if (unanswered < 0) {
    console.error(
      "Invalid input: total cannot be less than the sum of correct and wrong."
    );
    return null;
  }

  const percentage = (correct / total) * 100;
  return percentage.toFixed(2); // Return the percentage rounded to 2 decimal places
}

function getAnswers(attempts, userEmail) {
  const myAttempt = attempts?.find((item) => {
    const user = item?.user;

    if (user?.email === userEmail) {
      return item;
    } else {
      return null;
    }
  });

  if (!myAttempt) return null;

  return {
    correct_answers: myAttempt?.correct_answers,
    submitted_answers: myAttempt?.submitted_answers,
  };
}

const calculateAnswerSelection = (
  questionId,
  submittedAnswer,
  correctAnswers
) => {
  const correctAnswer = correctAnswers?.find((item) => {
    if (item?.question_id === questionId) {
      return item;
    } else {
      return;
    }
  });

  const selectedAnswer = submittedAnswer?.find((item) => {
    if (item?.question_id === questionId) {
      return item;
    } else {
      return;
    }
  });

  return {
    correctAnswer: correctAnswer?.answer,
    selectedAnswer: selectedAnswer?.answer,
  };
};

export { calculateAnswerSelection, calculateResultPercentage, getAnswers };
