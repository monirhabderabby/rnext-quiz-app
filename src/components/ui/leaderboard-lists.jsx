import React from "react";

const LeaderboardLists = () => {
  return (
    <ul class="space-y-4">
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
    <li class="flex items-center justify-between">
      <div class="flex items-center">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          alt="SPD Smith"
          class="object-cover w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 class="font-semibold">{name}</h3>
          <p class="text-sm text-gray-500">{position}</p>
        </div>
      </div>
      <div class="flex items-center">
        <span class="mr-2">{point}</span>
      </div>
    </li>
  );
};
