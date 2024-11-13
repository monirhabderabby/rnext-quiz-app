import React from "react";

const LeaderboardLists = () => {
  return (
    <ul className="space-y-4">
      <LeaderboardItem name="SPD Smith" position="1st" point="2,340" />
      <LeaderboardItem name="Monir Hossain" position="2nd" point="2,340" />
      <LeaderboardItem name="Mehedi Hasan" position="3rd" point="2,340" />
      <LeaderboardItem name="Mayesa" position="4th" point="2,340" />
    </ul>
  );
};

export default LeaderboardLists;

const LeaderboardItem = ({ name, position, point }) => {
  return (
    <li className="flex items-center justify-between">
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
