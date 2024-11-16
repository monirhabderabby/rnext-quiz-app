import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, TriangleAlert } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Local import
import useAxios from "../../hooks/useAxios";

const QuizQuestionForm = ({ initialData, setEditingQuiz }) => {
  const { id } = useParams(); // Get quiz ID from URL params
  const { api } = useAxios();
  const queryClient = useQueryClient();

  // Mutation setup for submitting form data
  const { isPending, mutate } = useMutation({
    mutationKey: ["questions"],
    mutationFn: (body) =>
      initialData
        ? api.patch(`/admin/questions/${initialData?.id}`, body) // For edit
        : api.post(`/admin/quizzes/${id}/questions`, body), // For create
  });

  // initialize react hook form
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      question: "",
      options: [
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
      ],
      correctAnswer: "",
    },
  });

  // Dynamically update form when `initialData` changes
  useEffect(() => {
    if (initialData) {
      const formattedOptions = initialData?.options?.map((option, index) => ({
        id: index + 1,
        value: option,
      }));

      reset({
        question: initialData.question,
        options: formattedOptions,
        correctAnswer: initialData.correctAnswer,
      });
    }

    return () => {
      reset();
    };
  }, [initialData, reset]);

  // Dynamic field array for managing options
  const { fields } = useFieldArray({
    control,
    name: "options",
  });

  // Display error toast if correct answer selection is invalid
  useEffect(() => {
    if (errors.correctAnswer) {
      toast.error(errors.correctAnswer.message, {
        duration: 5000,
        className: "text-red-500",
      });
    }
  }, [errors.correctAnswer]);

  const handleQuestionAdd = (formData) => {
    const correctAnswerIndex = parseInt(formData.correctAnswer);

    // Convert options to array of strings
    const options = formData.options.map(({ id, value }) => value);

    const formattedData = {
      question: formData.question,
      options: options,
      correctAnswer: options[correctAnswerIndex],
    };

    // Execute mutation with success and error handling
    mutate(formattedData, {
      onError: (err) => {
        const message = err.response?.data?.message || err.message;
        toast.error(message, {
          duration: 5000,
          icon: <TriangleAlert className="h-5 w-5 " />,
        });
      },
      onSuccess: () => {
        toast.success(
          initialData
            ? "Question updated successfully!"
            : "Question added successfully!",
          {
            icon: <CircleCheck className="h-5 w-5 text-green-500" />,
            duration: 5000,
          }
        );
        if (initialData) {
          setEditingQuiz({
            question: null,
            options: null,
            correctAnswer: null,
            id: null,
          });
        }
        reset();
        queryClient.invalidateQueries(["quizzes"]);
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleQuestionAdd)}>
      <h2 className="text-xl font-bold text-foreground">
        {initialData ? "Edit Quiz Question" : "Create Quiz Question"}
      </h2>

      {/* Question Title */}
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Question Title
        </label>
        <input
          {...register("question", {
            required: "Please provide a question to proceed.",
          })}
          type="text"
          id="question"
          name="question"
          className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
          placeholder="Enter quiz title"
        />
        {errors?.question && (
          <p className="text-red-500 text-sm mt-1">
            {errors["question"]?.message}
          </p>
        )}
      </div>

      {/* Options */}
      <p className="text-sm text-gray-600 mt-4">Add Options</p>
      <div id="optionsContainer" className="space-y-2 mt-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
          >
            <input
              type="radio"
              {...register("correctAnswer", {
                required: "Select the correct answer",
              })}
              value={index}
              checked={watch("correctAnswer") === field.value}
              onChange={() => setValue("correctAnswer", field.value)}
              className="text-primary focus:ring-0 w-4 h-4"
            />
            <label htmlFor={`optionText${index}`} className="sr-only">
              Option {index + 1}
            </label>
            <input
              {...register(`options.${index}.value`, {
                required: "Write a quiz option",
              })}
              type="text"
              id={`optionText${index}`}
              className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
              placeholder={`Option ${index + 1}`}
            />
            {errors.options?.[index]?.value && (
              <p className="text-red-500 text-sm mt-1">
                {errors.options[index].value.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        {isPending
          ? "Saving..."
          : initialData
          ? "Update Question"
          : "Create Question"}
      </button>
    </form>
  );
};

export default QuizQuestionForm;
