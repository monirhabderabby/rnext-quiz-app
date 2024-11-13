// Packages
import React from "react";
import { Link, useParams } from "react-router-dom";

// Local imports
import progress from "../../assets/progressbar.svg";

const ResultOverview = ({ title, description, total, correct, wrong }) => {
  const { id } = useParams();
  return (
    <div class="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <div>
        <div class="text-white">
          <div>
            <h2 class="text-4xl font-bold mb-2">{title}</h2>
            <p>{description}</p>
          </div>

          <div class="my-6 flex items-center  ">
            <div class="w-1/2">
              <div class="flex gap-6 my-6">
                <div>
                  <p class="font-semibold text-2xl my-0">{total}</p>
                  <p class="text-gray-300">Questions</p>
                </div>

                <div>
                  <p class="font-semibold text-2xl my-0">{correct}</p>
                  <p class="text-gray-300">Correct</p>
                </div>

                <div>
                  <p class="font-semibold text-2xl my-0">{wrong}</p>
                  <p class="text-gray-300">Wrong</p>
                </div>
              </div>

              <Link
                to={`/quiz/${id}/leaderboard`}
                class=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </Link>
            </div>

            <div class="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div class="flex-1">
                <p class="text-2xl font-bold">
                  {correct}/{total}
                </p>
                <p>Your Mark</p>
              </div>
              <div>
                <img src={progress} class="h-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultOverview;
