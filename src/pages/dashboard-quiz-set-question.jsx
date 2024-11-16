// Packages
import { useQuery } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Local imports
import QuestionCard from "../components/shared/cards/question-card";
import DashboardQuizAction from "../components/ui/dashboard-quiz-action";
import DashboardQuizSetHeader from "../components/ui/dashboard-quiz-set-header";
import { icons } from "../components/ui/icons";
import QuizQuestionForm from "../components/ui/quiz-question-form";
import useAxios from "../hooks/useAxios";

const DashboardQuestionsSetupContainer = () => {
  const [editingQuiz, setEditingQuiz] = useState({
    question: null,
    options: null,
    correctAnswer: null,
    id: null,
  });
  const { api } = useAxios();
  const { id } = useParams();

  // Query setup for getting all quizzes
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => api.get(`/admin/quizzes`),
  });

  const { currentQuiz, questions, setId } = useMemo(() => {
    const quizSetLists = data?.data;

    // Find the quiz with the specific id
    const current = quizSetLists?.find((item) => item.id === id);

    // If current is undefined, return default values
    if (!current) return { currentQuiz: null, questions: [] };

    return {
      currentQuiz: current,
      questions: current?.Questions || [],
      setId: current?.id,
    };
  }, [data?.data]);

  let content;

  if (isLoading) {
    content = <LoadingState />;
  } else if (isError) {
    content = <ErrorState error={error} />;
  } else {
    content = (
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full flex justify-between items-center">
          <Nav />
          <DashboardQuizAction
            quizId={currentQuiz?.id}
            isPublished={currentQuiz?.status !== "draft"}
            initialData={currentQuiz}
          />
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
            {/* <!-- Left Column --> */}
            <div className="">
              <DashboardQuizSetHeader
                title={currentQuiz?.title}
                totalQuestions={questions?.length}
                description={currentQuiz?.description}
              />

              <QuizQuestionForm
                initialData={editingQuiz}
                setEditingQuiz={setEditingQuiz}
              />
            </div>

            {/* <!-- Right Column --> */}
            <div className="px-4">
              {/* <!-- Question One --> */}
              {questions?.map(
                ({ id, question, options, correctAnswer }, index) => (
                  <QuestionCard
                    key={id}
                    question={question}
                    options={options}
                    correctAnswer={correctAnswer}
                    questionId={id}
                    editingQuiz={editingQuiz}
                    setEditingQuiz={setEditingQuiz}
                    index={index}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return content;
};

export default DashboardQuestionsSetupContainer;

const Nav = () => {
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-buzzr-purple"
          >
            Home
          </Link>
          {icons.chevronRight}
        </li>
        <li>
          <a
            href="#"
            className="text-gray-600 hover:text-buzzr-purple"
            aria-current="page"
          >
            Quizzes
          </a>
        </li>
      </ol>
    </nav>
  );
};

const LoadingState = () => {
  return (
    <div className="w-[calc(100%-256px)] min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-2">
        <Loader2 className="animate-spin" />
        <p>Retrieving data for you...</p>
      </div>
    </div>
  );
};
const ErrorState = ({ error }) => {
  return (
    <div className="w-[calc(100%-256px)] min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-2 text-red-500">
        <TriangleAlert />
        {error?.message || "Something went wrong"}
      </div>
    </div>
  );
};
