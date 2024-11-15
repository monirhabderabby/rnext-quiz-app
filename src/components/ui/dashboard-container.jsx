import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import DashboardQuizCard, {
  DashboardQuizCardSkeleton,
} from "../shared/cards/dashboard-quiz-card";
import { icons } from "./icons";

const DashboardContainer = () => {
  const { api } = useAxios();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => api.get("/admin/quizzes"),
  });

  if (isLoading) return;

  let content;
  if (isLoading) {
    content = [1, 2, 3].map((n) => <DashboardQuizCardSkeleton key={n} />);
  } else if (isError) {
    content = (
      <div className="col-span-1 lg:col-span-3 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-y-2 text-red-500">
          <TriangleAlert />
          {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  } else if (data?.data?.length > 0) {
    content = data?.data?.map(({ id, title, description }) => (
      <DashboardQuizCard
        key={id}
        title={title}
        description={description}
        id={id}
      />
    ));
  }

  return (
    <main className="flex-grow p-10">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="quizzes/create" className="group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              {icons.plus}
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              Create a new quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Build from the ground up
            </p>
          </div>
        </Link>

        {content}
      </div>
    </main>
  );
};

export default DashboardContainer;
