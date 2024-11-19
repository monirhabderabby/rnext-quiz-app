import React from "react";

const LeaderboardStats = ({ userName, correct, wrong, position }) => {
  const mark = correct * 5;
  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          alt="Profile Pic"
          className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{userName}</h2>
        <p className="text-xl">{position} Position</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm opacity-75">Mark</p>
          <p className="text-2xl font-bold">{mark}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Correct</p>
          <p className="text-2xl font-bold">{correct}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Wrong</p>
          <p className="text-2xl font-bold">{wrong}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardStats;
