import React from "react";

const QuizPlayGround = () => {
  return (
    <div class="lg:col-span-2 bg-white">
      <div class="bg-white p-6 !pb-2 rounded-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-semibold">
            3. What is the height of an empty binary tree?
          </h3>
        </div>
        <div class="grid grid-cols-2 gap-4">
          {/* <!-- Option 1 --> */}
          <Option option={0} />
          <Option option={-1} />
          <Option option={2} />
          <Option option={4} />

          {/* <!-- Option 4 --> */}
        </div>
        <a
          href="./result.html"
          class="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default QuizPlayGround;

const Option = ({ option }) => {
  return (
    <label class="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
      <input
        type="checkbox"
        name="answer4"
        class="form-radio text-buzzr-purple"
      />
      <span>{option}</span>
    </label>
  );
};
