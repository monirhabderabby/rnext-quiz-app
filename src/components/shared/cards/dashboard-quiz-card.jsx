import React from "react";
import { icons } from "../../../lib/icons";

const DashboardQuizCard = ({ title, description }) => {
  return (
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
      <div class="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
        {icons.QuizIcon}
      </div>
      <h3 class="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
        {title}
      </h3>
      <p class="text-gray-600 text-sm group-hover:scale-105 transition-all">
        {description}
      </p>
    </div>
  );
};

export default DashboardQuizCard;
