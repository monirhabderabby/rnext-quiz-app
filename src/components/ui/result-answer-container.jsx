import React from "react";

const ResultAnswerContainer = () => {
  return (
    <div class="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div class="h-[calc(100vh-50px)] overflow-y-scroll ">
        <div class="px-4">
          <Question />
        </div>
      </div>
    </div>
  );
};

export default ResultAnswerContainer;

const Question = () => {
  return (
    <div class="rounded-lg overflow-hidden shadow-sm mb-4">
      <div class="bg-white p-6 !pb-2">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">
            1. Which of the following is NOT a binary tree traversal method?
          </h3>
        </div>
        <div class="space-y-2">
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="answer1"
              class="form-radio text-buzzr-purple"
              checked
            />
            <span>Inorder</span>
          </label>
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="answer1"
              class="form-radio text-buzzr-purple"
            />
            <span>Preorder</span>
          </label>
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="answer1"
              class="form-radio text-buzzr-purple"
            />
            <span>Postorder</span>
          </label>
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="answer1"
              class="form-radio text-buzzr-purple"
            />
            <span>Crossorder</span>
          </label>
        </div>
      </div>
      <div class="flex space-x-4 bg-primary/10 px-6 py-2">
        <button class="text-red-600 hover:text-red-800 font-medium">
          Delete
        </button>
        <button class="text-primary hover:text-primary/80 font-medium">
          Edit Question
        </button>
      </div>
    </div>
  );
};
