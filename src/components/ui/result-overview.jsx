// Packages
import React from "react";
import { Link, useParams } from "react-router-dom";

// Local imports
import { calculateResultPercentage } from "../../lib/result";
import CirculerProgress from "./circuler-progress";

const ResultOverview = ({ title, description, total, correct, wrong }) => {
  const { id } = useParams();

  const percentage = calculateResultPercentage(total, correct, wrong);
  return (
    <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <div>
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p>{description}</p>
          </div>

          <div className="my-6 flex items-center  ">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">{total}</p>
                  <p className="text-gray-300">Questions</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{correct}</p>
                  <p className="text-gray-300">Correct</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{wrong}</p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>

              <Link
                to={`/quiz/${id}/leaderboard`}
                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </Link>
            </div>

            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {correct}/{total}
                </p>
                <p>Your Mark</p>
              </div>
              <div>
                <CirculerProgress percentage={percentage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultOverview;
