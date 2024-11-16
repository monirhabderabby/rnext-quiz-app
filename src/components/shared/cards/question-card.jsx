import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import useAxios from "../../../hooks/useAxios";

const QuestionCard = ({
  question,
  options,
  correctAnswer,
  questionId,
  editingQuiz,
  setEditingQuiz,
  index,
}) => {
  const { api } = useAxios();
  const queryClient = useQueryClient();

  // Setting up mutation to handle question deletion
  const { isPending, mutate } = useMutation({
    mutationKey: ["question"],
    mutationFn: () => api.delete(`/admin/questions/${questionId}`),

    // Error handler for deletion failure
    onError: (err) => {
      const message = err.response?.data?.message || err.message;
      toast.error(message, {
        duration: 5000,
        icon: <TriangleAlert className="h-5 w-5 " />,
      });
    },

    // Success handler for deletion
    onSuccess: () => {
      queryClient.invalidateQueries(["quizzes"]); // Refresh related quiz data
    },
  });

  // Confirm deletion before proceeding with mutation
  const handleDelete = () => {
    if (confirm("Are you sure want to delete")) {
      mutate(); // Execute deletion if confirmed
    }
  };

  const isEditingOn = questionId === editingQuiz?.id;

  const handleEditing = () => {
    if (isEditingOn) {
      setEditingQuiz({
        question: null,
        options: null,
        correctAnswer: null,
        id: null,
      });
    } else {
      setEditingQuiz({
        question: question,
        options: options,
        correctAnswer: correctAnswer,
        id: questionId,
      });
    }
  };
  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{`${
            index + 1
          }. ${question}`}</h3>
        </div>

        {/* Displaying answer options */}
        <div className="space-y-2">
          {options.map((opt) => (
            <RadioButton
              key={opt}
              opt={opt}
              isChecked={Boolean(correctAnswer == opt)}
              name={opt}
            />
          ))}
        </div>
      </div>

      {/* Action buttons for delete and edit */}
      <div className="flex space-x-4 bg-primary/10 px-6 py-2">
        <button
          className="text-red-600 hover:text-red-800 font-medium"
          onClick={handleDelete}
          disabled={isPending} // Disable button while pending
        >
          Delete
        </button>
        <button
          className="text-primary hover:text-primary/80 font-medium"
          disabled={isPending} // Disable button while pending
          onClick={handleEditing}
        >
          {isEditingOn ? "Cancel Edit" : "Edit Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;

const RadioButton = ({ opt, isChecked, name }) => {
  return (
    <label className="flex items-center space-x-3" key={opt}>
      <input
        type="radio"
        name={name}
        className="form-radio text-buzzr-purple"
        checked={isChecked}
      />
      <span>{opt}</span>
    </label>
  );
};
