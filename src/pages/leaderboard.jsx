// Packages
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

// Local imports
import LeaderboardLists from "../components/ui/leaderboard-lists";
import LeaderboardStats from "../components/ui/leaderboard-stats";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import calculateResults, {
  calculateLeaderboard,
  getAnswers,
  toOrdinal,
} from "../lib/result";
import { ErrorState, LoaderState } from "./result";

const Leaderboard = () => {
  const { id } = useParams();
  const { api } = useAxios();
  const { auth } = useAuth();

  const userEmail = auth?.user?.email;
  const userName = auth?.user?.full_name;

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
    const title = attemptData?.quiz?.title;

    const { correct_answers, submitted_answers } = getAnswers(
      attemptData?.attempts,
      userEmail
    ); // Parsed submitted answers and correct answers

    const { totalCorrect, totalWrong } = calculateResults(
      correct_answers,
      submitted_answers
    ); // Calculate results

    const leaderboard = calculateLeaderboard(attemptData?.attempts);

    const myLeaderboard = leaderboard?.find((item) => item.email === userEmail);

    const oridinalPosition = toOrdinal(myLeaderboard?.position);

    content = (
      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Left Column --> */}
            <LeaderboardStats
              userName={userName}
              correct={totalCorrect}
              wrong={totalWrong}
              position={oridinalPosition}
            />

            {/* <!-- Right Column --> */}
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="mb-6">{title}</p>
              <LeaderboardLists
                leaderboard={leaderboard}
                userEmail={userEmail}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return content;
};

export default Leaderboard;
