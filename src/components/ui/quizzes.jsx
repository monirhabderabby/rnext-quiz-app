import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import React from "react";
import useAxios from "../../hooks/useAxios";
import QuizCard, { QuizCardSkeleton } from "../shared/cards/quiz-card";

const Quizzes = () => {
  const { api } = useAxios();
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => api.get("/quizzes"),
  });

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <QuizCardSkeleton key={n} />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="w-full min-h-[300px] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-y-2 text-red-500">
          <TriangleAlert />
          {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  } else if (data?.data?.data?.length === 0) {
    content = (
      <div className="w-full min-h-[300px] flex justify-center items-center max-w-[300px] mx-auto text-center">
        Oops! No quizzes available at the moment. Please check back later.
      </div>
    );
  } else if (data?.data?.data?.length > 0) {
    console.log(data?.data?.data);
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.data?.map((item) => (
          <QuizCard
            key={item.id}
            title={item?.title}
            description={item?.description}
            thumbnail={item?.thumbnail}
            id={item?.id}
            isAttempt={item?.is_attempted}
          />
        ))}
      </div>
    );
  }
  return (
    <main className="bg-white p-6 rounded-md h-full">
      <section>
        <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

        {/* <!-- Cards --> */}
        {content}
      </section>
    </main>
  );
};

export default Quizzes;
