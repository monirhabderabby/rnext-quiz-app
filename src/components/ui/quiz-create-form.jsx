import React from "react";
import { useForm } from "react-hook-form";
import TextFields from "../shared/text-field";

const QuizCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreation = (formData) => {
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit(handleCreation)}>
      {/* <div className="mb-4">
        <label
          for="quiz-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quiz title
        </label>
        <input
          type="text"
          id="quiz-title"
          name="quiz-title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Quiz"
        />
      </div> */}
      <TextFields
        register={{
          ...register("title", {
            required: "Title is required. Please enter a title for the quiz",
          }),
        }}
        errors={errors}
        label="Quiz title"
        name="title"
        placeholder="Quiz"
        type="text"
      />

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          {...register("description", {
            required:
              "Description is required. Please enter a brief description for the quiz",
          })}
          id="description"
          name="description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
        ></textarea>
        {errors["description"] && (
          <p className="text-red-500 text-sm mt-1">
            {errors["description"]?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Next
      </button>
    </form>
  );
};

export default QuizCreateForm;
