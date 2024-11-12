import React from "react";
import { useParams } from "react-router-dom";
import QuizPlaySidebar from "../components/ui/quiz-play-sidebar";
import QuizPlayGround from "../components/ui/quiz-playground";

const Quiz = () => {
  const { id } = useParams();
  return (
    <div className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        <QuizPlaySidebar />
        <QuizPlayGround />
      </div>
    </div>
  );
};

export default Quiz;
