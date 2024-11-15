// Packages
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, Trash, TriangleAlert } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Local imports
import useAxios from "../../hooks/useAxios";

const DashboardQuizAction = ({ quizId, isPublished, initialData }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  // Mutation for deleting a quiz
  const { isPending: isDeleteLoading, mutate: deleteMutate } = useMutation({
    mutationKey: ["quiz"],
    mutationFn: () => api.delete(`/admin/quizzes/${quizId}`),
    onError: (err) => {
      const message = err.response?.data?.message || err.message;
      toast.error(message, {
        duration: 5000,
        icon: <TriangleAlert className="h-5 w-5 " />,
      });
    },
    onSuccess: () => {
      navigate("/dashboard");
      toast.success("Quiz Delete successfully!", {
        icon: <CircleCheck className="h-5 w-5 text-green-500" />,
        duration: 5000,
      });
    },
  });

  // Mutation for quiz status update
  const { isPending: isUpdating, mutate: mutateStatus } = useMutation({
    mutationKey: ["quiz"],
    mutationFn: (body) => api.patch(`/admin/quizzes/${quizId}`, body),
    onError: (err) => {
      const message = err.response?.data?.message || err.message;
      toast.error(message, {
        duration: 5000,
        icon: <TriangleAlert className="h-5 w-5 " />,
      });
    },
    onSuccess: () => {
      navigate(0);
      const message = isPublished
        ? "Quiz now on draft mode!"
        : "Quiz published successfully!";
      toast.success(message, {
        icon: <CircleCheck className="h-5 w-5 text-green-500" />,
        duration: 5000,
      });
    },
  });

  /**
   * Handle quiz deletion with user confirmation.
   */
  const handleQuizDelete = () => {
    if (confirm("Are you sure want to delete?")) {
      deleteMutate();
    } else {
      return;
    }
  };

  const handleStatus = () => {
    const body = {
      ...initialData,
      status: isPublished ? "draft" : "published",
    };
    mutateStatus(body);
  };
  return (
    <div className="flex items-center gap-x-2 mb-3">
      <button
        className="w-full border-primary/50 border-[0.2px] text-primary  text-primary-foreground p-2 px-4 rounded-md  transition-colors hover:bg-primary/20 disabled:text-primary/40 disabled:border-primary/30"
        disabled={isDeleteLoading || isUpdating}
        onClick={handleStatus}
      >
        {isPublished ? "Draft" : "Publish"}
      </button>
      <button
        className="w-fit bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:bg-primary/60"
        onClick={handleQuizDelete}
        disabled={isDeleteLoading || isUpdating}
      >
        <Trash />
      </button>
    </div>
  );
};

export default DashboardQuizAction;
