import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ title, description, thumbnail, id, isAttempt = false }) => {
  const redirectTo = isAttempt ? `/quiz/${id}/result` : `/quiz/${id}`;
  return (
    <Link
      to={redirectTo}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
    >
      <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
          {title}
        </h1>
        <p className="mt-2 text-lg">{description}</p>
      </div>

      {isAttempt && (
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl font-bold">Already Participated</h1>
            <p className="text-center">Click to view your leaderboard</p>
          </div>
        </div>
      )}
      <img
        src={thumbnail}
        alt="JavaScript Hoisting"
        className="w-full h-full object-cover rounded mb-4 transition-all "
      />
    </Link>
  );
};

export default QuizCard;

export const QuizCardSkeleton = () => {
  return (
    <div class="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow min-h-[450px] cursor-pointer group relative animate-pulse">
      <div class="absolute w-full h-full top-0 bg-gray-200"></div>
    </div>
  );
};
