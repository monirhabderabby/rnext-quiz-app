import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import DashboardQuizCard from "../shared/cards/dashboard-quiz-card";
import { icons } from "./icons";

const DashboardContainer = () => {
  const { api } = useAxios();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => api.get("/admin/quizzes"),
  });

  if (isLoading) return;

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

        <DashboardQuizCard
          title="JavaScript Basics Quiz"
          description="Test knowledge of core JavaScript"
        />
        <DashboardQuizCard
          title="React Hooks Quiz"
          description="Test knowledge of core JavaScript"
        />
        <DashboardQuizCard
          title="Backend vs. Frontend Quiz"
          description="Test knowledge of core JavaScript"
        />
      </div>
    </main>
  );
};

export default DashboardContainer;
