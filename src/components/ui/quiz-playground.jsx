import React from "react";

const QuizPlayGround = ({
  question,
  index,
  handleAnswerSelect,
  answers,
  onNextQuestion,
  isLast,
  isLoading,
}) => {
  const currentAnswer = (answers && answers[question?.id]) || {};

  const handleOptionSelect = (selectedAnswer) => {
    handleAnswerSelect(question?.id, selectedAnswer);
  };

  return (
    <div className="lg:col-span-2 bg-white">
      <div className="bg-white p-6 !pb-2 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">
            {index}. {question?.question}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* <!-- Option 1 --> */}
          {question?.options.map((opt) => (
            <Option
              option={opt}
              key={opt}
              handleOptionSelect={handleOptionSelect}
              answer={currentAnswer}
            />
          ))}

          {/* <!-- Option 4 --> */}
        </div>
        <button
          className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
          onClick={onNextQuestion}
          disabled={isLoading}
        >
          {isLast ? "Sumit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizPlayGround;

const Option = ({ option, handleOptionSelect, answer, isLoading }) => {
  return (
    <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
      <input
        type="checkbox"
        name="answer4"
        checked={answer === option}
        className="form-radio text-buzzr-purple"
        onChange={() => handleOptionSelect(option)}
        disabled={isLoading}
      />
      <span>{option}</span>
    </label>
  );
};
