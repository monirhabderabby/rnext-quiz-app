// Packages
import React from "react";
import { useParams } from "react-router-dom";

// Local imports
import { useQuery } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import logo from "../assets/logo-white.svg";
import ResultAnswerContainer from "../components/ui/result-answer-container";
import ResultOverview from "../components/ui/result-overview";
import useAxios from "../hooks/useAxios";
import calculateResults from "../lib/result";

const Result = () => {
  const { id } = useParams();
  const { api } = useAxios();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["result", id],
    queryFn: () => api.get(`/quizzes/${id}/attempts`),
  });

  let content;

  if (isLoading) {
    content = <LoaderState />;
  } else if (isError) {
    content = <ErrorState error={error} />;
  } else if (data?.data) {
    const attemptData = data?.data?.data;
    const totalQuestion = attemptData?.quiz?.total_questions;
    const correctAnswers = attemptData?.attempts[0]?.correct_answers;
    const submittedAnswers = attemptData?.attempts[0]?.submitted_answers;

    const { totalCorrect, totalWrong } = calculateResults(
      correctAnswers,
      submittedAnswers
    );

    content = (
      <div className="bg-background text-foreground min-h-screen">
        <div className="flex min-h-screen overflow-hidden">
          <img src={logo} className="max-h-11 fixed left-6 top-6 z-50" />
          <ResultOverview
            title={attemptData?.quiz?.title}
            description={attemptData?.quiz?.description}
            total={totalQuestion}
            correct={totalCorrect}
            wrong={totalWrong}
          />
          <ResultAnswerContainer />
        </div>
      </div>
    );
  }
  return content;
};

export default Result;

const LoaderState = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
        <Loader2 className="animate-spin mb-4" />
        <p className="text-lg font-medium text-gray-700">
          Loading data, please wait...
        </p>
        <p className="text-sm text-gray-500">
          We are retrieving the necessary information to serve your request.
        </p>
      </div>
    </div>
  );
};

const ErrorState = ({ error }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="col-span-1 lg:col-span-3 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-y-2 text-red-500">
          <TriangleAlert />
          {error?.message || "Something went wrong"}
        </div>
      </div>
    </div>
  );
};
