import React from "react";

const QuizPlaySidebar = () => {
  return (
    <div class="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
      <div>
        <h2 class="text-4xl font-bold mb-4">React Hooks Quiz</h2>
        <p class="text-gray-600 mb-4">
          A quiz on React hooks like useState, useEffect, and useContext.
        </p>

        <div class="flex flex-col">
          <div class="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
            Total number of questions : 10
          </div>

          <div class="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
            Participation : 1
          </div>

          <div class="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
            Remaining : 9
          </div>
        </div>
      </div>

      <div class="mt-auto flex items-center">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          alt="Mr Hasan"
          class="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <span class="text-black font-semibold">Saad Hasan</span>
      </div>
    </div>
  );
};

export default QuizPlaySidebar;
