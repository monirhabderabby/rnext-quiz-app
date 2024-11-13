import React from "react";

const LeaderboardStats = () => {
  return (
    <div class="bg-primary rounded-lg p-6 text-white">
      <div class="flex flex-col items-center mb-6">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          alt="Profile Pic"
          class="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
        />
        <h2 class="text-2xl font-bold">Saad Hasan</h2>
        <p class="text-xl">20 Position</p>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="text-center">
          <p class="text-sm opacity-75">Mark</p>
          <p class="text-2xl font-bold">1200</p>
        </div>
        <div class="text-center">
          <p class="text-sm opacity-75">Correct</p>
          <p class="text-2xl font-bold">08</p>
        </div>
        <div class="text-center">
          <p class="text-sm opacity-75">Wrong</p>
          <p class="text-2xl font-bold">16</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardStats;
