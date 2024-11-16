// Packages
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Local imports
import { toast } from "sonner";
import QuizPlaySidebar from "../components/ui/quiz-play-sidebar";
import QuizPlayGround from "../components/ui/quiz-playground";
import useAxios from "../hooks/useAxios";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(null);
  const navigate = useNavigate();
  const { api } = useAxios();
  const { id } = useParams();

  // Fetch quiz data using react-query
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => api.get(`quizzes/${id}`),
  });

  const quizSetId = data?.data?.data?.id || "";

  const { isPending, mutate } = useMutation({
    mutationKey: ["quizAttempt"],
    mutationFn: (body) => api.post(`quizzes/${quizSetId}/attempt`, body),
    onError: (err) => {
      const message = err.response?.data?.message || err.message;
      toast.error(message, {
        duration: 5000,
        icon: <TriangleAlert className="h-5 w-5 " />,
      });
    },
    onSuccess: (response) => {
      navigate(`/quiz/${quizSetId}/result`);
    },
  });

  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer, // Add or update the answer for the specific question
    }));
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < data?.data?.data?.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const data = {
        answers: {
          ...answers,
        },
      };
      mutate(data); // Submit or log answers when quiz is completed
    }
  };

  // Determine if the current question is the last one
  const isLast =
    currentQuestionIndex === data?.data?.data?.questions.length - 1;

  // Variable to hold the appropriate content based on data state
  let content;

  if (isLoading) {
    content = (
      <div className="max-w-8xl mx-auto flex justify-center items-center h-[calc(100vh-10rem)]">
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
  } else if (isError) {
    content = (
      <div className="max-w-8xl mx-auto flex justify-center items-center h-[calc(100vh-10rem)]">
        <div className="col-span-1 lg:col-span-3 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-y-2 text-red-500">
            <TriangleAlert />
            {error?.message || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  } else if (data?.data) {
    content = (
      <div className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <QuizPlaySidebar
            data={data?.data?.data}
            participated={
              (answers && Object.getOwnPropertyNames(answers)) || []
            }
          />
          <QuizPlayGround
            question={data?.data?.data?.questions[currentQuestionIndex]}
            index={currentQuestionIndex + 1}
            handleAnswerSelect={handleAnswerSelect}
            answers={answers}
            onNextQuestion={handleNextQuestion}
            isLast={isLast}
            isLoading={isPending}
          />
        </div>
      </div>
    );
  }

  return content;
};

export default Quiz;
