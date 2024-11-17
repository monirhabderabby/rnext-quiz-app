// Packages
import { useQuery } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

// Local imports
import logo from "../assets/logo-white.svg";
import ResultAnswerContainer from "../components/ui/result-answer-container";
import ResultOverview from "../components/ui/result-overview";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import calculateResults, { getAnswers } from "../lib/result";

const Result = () => {
  const { id } = useParams();
  const { api } = useAxios();
  const { auth } = useAuth();

  const userEmail = auth?.user?.email;

  // Fetch quiz attempt data
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

    const { correct_answers, submitted_answers } = getAnswers(
      attemptData?.attempts,
      userEmail
    ); // Parsed submitted answers and correct answers

    const totalQuestion = attemptData?.quiz?.total_questions;
    const quizId = attemptData?.quiz?.id;

    const { totalCorrect, totalWrong } = calculateResults(
      correct_answers,
      submitted_answers
    ); // Calculate results

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
          <ResultAnswerContainer
            quizId={quizId}
            submittedAnswers={submitted_answers}
            correctAnswers={correct_answers}
          />
        </div>
      </div>
    );
  }
  return content;
};

export default Result;

export const LoaderState = () => {
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

export const ErrorState = ({ error }) => {
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
