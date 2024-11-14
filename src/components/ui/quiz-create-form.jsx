// Packages
import { useMutation } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Local imports
import useAxios from "../../hooks/useAxios";
import TextFields from "../shared/text-field";

const QuizCreateForm = () => {
  const { api } = useAxios();
  const navigate = useNavigate();

  // Mutation for creating a quiz
  const { isPending, mutate } = useMutation({
    mutationKey: ["quizzes"],
    mutationFn: (body) => api.post("/admin/quizzes", body),
  });

  // Form setup with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Form submission handler
  const handleCreation = (formData) => {
    mutate(formData, {
      // Error handling: Display error toast with message
      onError: (err) => {
        const message = err.response?.data?.message || err.message;
        toast.error(message, {
          duration: 5000,
          icon: <TriangleAlert className="h-5 w-5 " />,
        });
      },
      // Success handling: Reset form and navigate to setup page
      onSuccess: (data) => {
        const quizId = data?.data?.data?.id;
        reset();
        navigate(`/dashboard/quizzes/create/${quizId}/setup`);
      },
    });
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
        registerOptions={{
          ...register("title", {
            required: "Title is required. Please enter a title for the quiz",
          }),
        }}
        errors={errors}
        label="Quiz title"
        name="title"
        placeholder="Quiz"
        type="text"
        isLoading={isPending}
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
          disabled={isPending}
        ></textarea>
        {errors["description"] && (
          <p className="text-red-500 text-sm mt-1">
            {errors["description"]?.message}
          </p>
        )}
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {isPending ? "Please wait..." : "Next"}
      </button>
    </form>
  );
};

export default QuizCreateForm;
