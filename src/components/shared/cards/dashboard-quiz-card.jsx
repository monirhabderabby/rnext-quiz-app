import React from "react";
import { Link } from "react-router-dom";
import { icons } from "../../ui/icons";

// DashboardQuizCard component: displays an interactive card for a quiz
// Props:
// - title: the title of the quiz
// - description: a brief description of the quiz
// - id: the unique identifier of the quiz, used for navigation
const DashboardQuizCard = ({ title, description, id }) => {
  return (
    <Link
      to={`/dashboard/quizzes/create/${id}/setup`}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
    >
      <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
        {icons.QuizIcon}
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
        {title}
      </h3>
      <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
        {description}
      </p>
    </Link>
  );
};

export default DashboardQuizCard;

// DashboardQuizCardSkeleton component: displays a placeholder loading state for the quiz card
export const DashboardQuizCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer animate-pulse">
      <div className="h-8 w-8 bg-gray-200 mb-4 rounded"></div>
      <div className="h-4 bg-gray-200 mb-2 w-3/4 rounded-full"></div>
      <div className="h-3 bg-gray-200 w-full rounded-full"></div>
    </div>
  );
};
