import React from "react";
import { useParams } from "react-router-dom";
import LeaderboardLists from "../components/ui/leaderboard-lists";
import LeaderboardStats from "../components/ui/leaderboard-stats";

const Leaderboard = () => {
  const { id } = useParams();
  return (
    <main class="min-h-[calc(100vh-50px)] flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <!-- Left Column --> */}
          <LeaderboardStats />

          {/* <!-- Right Column --> */}
          <div>
            <h1 class="text-2xl font-bold">Leaderboard</h1>
            <p class="mb-6">React Hooks Quiz</p>
            <LeaderboardLists />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
