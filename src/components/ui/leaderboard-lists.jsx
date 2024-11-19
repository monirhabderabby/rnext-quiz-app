import React from "react";
import { toOrdinal } from "../../lib/result";

const LeaderboardLists = ({ leaderboard, userEmail }) => {
  return (
    <ul className="space-y-4">
      {leaderboard?.map(({ email, id, name, position, totalMarks }) => {
        const oridinalPosition = toOrdinal(position);
        return (
          <LeaderboardItem
            key={id}
            name={name}
            position={oridinalPosition}
            point={totalMarks}
            highlight={email === userEmail}
          />
        );
      })}
    </ul>
  );
};

export default LeaderboardLists;

const LeaderboardItem = ({ name, position, point, highlight }) => {
  return (
    <li
      className={`flex items-center justify-between ${
        highlight && "bg-green-100/80"
      }`}
    >
      <div className="flex items-center">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          alt="SPD Smith"
          className="object-cover w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">{point}</span>
      </div>
    </li>
  );
};
