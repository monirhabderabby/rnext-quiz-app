import React from "react";
import { Link } from "react-router-dom";
import QuizCreateForm from "../components/ui/quiz-create-form";
import { icons } from "../lib/icons";

const QuizCreationDashboard = () => {
  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Link
            to={-1}
            className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
          >
            {icons.chevronLeft}
            Back to home
          </Link>

          <h2 className="text-3xl font-bold mb-6">
            Give your quiz title and description
          </h2>

          <QuizCreateForm />
        </div>
      </div>
    </main>
  );
};

export default QuizCreationDashboard;
