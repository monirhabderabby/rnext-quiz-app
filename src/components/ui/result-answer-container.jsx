// Packages
import { useQuery } from "@tanstack/react-query";
import React from "react";

// Local imports
import useAxios from "../../hooks/useAxios";
import { calculateAnswerSelection } from "../../lib/result";
import { ErrorState, LoaderState } from "../../pages/result";

const ResultAnswerContainer = ({
  quizId,
  correctAnswers,
  submittedAnswers,
}) => {
  const { api } = useAxios();

  // Fetch quiz data using react-query
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => api.get(`/quizzes/${quizId}`),
  });

  // Extract questions from API response
  const questions = data?.data?.data?.questions;

  // Determine content to display based on query state
  let content;

  if (isLoading) {
    // Render loader state during data fetching
    content = (
      <div className="md:w-1/2 p-8">
        <LoaderState />;
      </div>
    );
  } else if (isError) {
    // Render error state if API call fails
    content = (
      <div className="md:w-1/2 p-8">
        <ErrorState error={error} />
      </div>
    );
  } else if (data?.data) {
    // Render the list of questions if data is successfully fetched
    content = (
      <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
        <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
          <div className="px-4">
            {questions?.map(({ id, options, question }, index) => (
              <Question
                key={id}
                index={index}
                question={question}
                options={options}
                questionId={id}
                submittedAnswers={submittedAnswers}
                correctAnswers={correctAnswers}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default ResultAnswerContainer;

/**
 * Question Component
 * Represents an individual quiz question with its options and a feedback message.
 */
const Question = ({
  index,
  question,
  options,
  questionId,
  correctAnswers,
  submittedAnswers,
}) => {
  // Calculate the correct answer and the user's selected answer
  const { correctAnswer, selectedAnswer } = calculateAnswerSelection(
    questionId,
    submittedAnswers,
    correctAnswers
  );

  // Generate a feedback message based on the user's selection
  const message =
    selectedAnswer === correctAnswer ? (
      <p>
        You selected{" "}
        <span className="font-semibold text-green-600">{selectedAnswer}</span>,
        and that's correct!
      </p>
    ) : selectedAnswer ? (
      <p className="">
        You selected{" "}
        <span className="font-semibold text-red-600">{selectedAnswer}</span>,
        but the correct answer is{" "}
        <span className="font-semibold text-green-600">{correctAnswer}</span>.
      </p>
    ) : (
      <p className="text-gray-600">No answer selected.</p>
    );
  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {index + 1}. {question}
          </h3>
        </div>
        <div className="space-y-2">
          {options?.map((opt) => (
            <RadioButton
              key={opt}
              opt={opt}
              correctAnswer={correctAnswer}
              selectedAnswer={selectedAnswer}
            />
          ))}
        </div>
      </div>
      <div className="p-2 px-3">{message}</div>
    </div>
  );
};

/**
 * RadioButton Component
 * Renders an individual radio button with visual feedback for correct/incorrect answers.
 */
const RadioButton = ({ opt, correctAnswer, selectedAnswer }) => {
  // Determine whether the option is correct (green) or incorrect (red)
  const green =
    correctAnswer === opt || (correctAnswer === opt) === selectedAnswer;
  const red = !green && opt === selectedAnswer;

  return (
    <label className="flex items-center space-x-3" key={opt}>
      <input
        type="radio"
        name={opt}
        className={`form-radio text-buzzr-purple ${
          green && "checked:accent-green-700"
        } ${red && "checked:accent-red-700"}`}
        checked={green || red}
      />
      <span>{opt}</span>
    </label>
  );
};
