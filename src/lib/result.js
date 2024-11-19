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
  return percentage; // Return the percentage rounded to 2 decimal places
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

// Calculates the leaderboard positions based on user performance.
const calculateLeaderboard = (data) => {
  // Calculate total marks for each user
  const leaderboard = data.map((entry) => {
    const totalMarks = entry.correct_answers.reduce((sum, correctAnswer) => {
      const submittedAnswer = entry.submitted_answers.find(
        (answer) => answer.question_id === correctAnswer.question_id
      );
      return submittedAnswer && submittedAnswer.answer === correctAnswer.answer
        ? sum + correctAnswer.marks
        : sum;
    }, 0);

    return {
      id: entry.user.id,
      name: entry.user.full_name,
      email: entry.user.email,
      totalMarks,
    };
  });

  // Sort by total marks in descending order
  leaderboard.sort((a, b) => b.totalMarks - a.totalMarks);

  // Assign unique positions
  leaderboard.forEach((entry, index) => {
    entry.position = index + 1;
  });

  // Return the final leaderboard with required fields
  return leaderboard.map(({ id, name, email, position, totalMarks }) => ({
    id,
    name,
    email,
    position,
    totalMarks,
  }));
};

// Helper function to convert a number to ordinal format
const toOrdinal = (num) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = num % 100;
  return `${num}${
    suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
  }`;
};

export {
  calculateAnswerSelection,
  calculateLeaderboard,
  calculateResultPercentage,
  getAnswers,
  toOrdinal,
};
