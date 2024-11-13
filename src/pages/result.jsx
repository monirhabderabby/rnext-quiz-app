// Packages
import React from "react";
import { useParams } from "react-router-dom";

// Local imports
import logo from "../assets/logo-white.svg";
import ResultAnswerContainer from "../components/ui/result-answer-container";
import ResultOverview from "../components/ui/result-overview";

const Result = () => {
  const { id } = useParams();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <img src={logo} class="max-h-11 fixed left-6 top-6 z-50" />
        <ResultOverview
          title="React Hooks Quiz"
          description=" A quiz on React hooks like useState, useEffect, and useContext."
          total={10}
          correct={8}
          wrong={2}
        />
        <ResultAnswerContainer />
      </div>
    </div>
  );
};

export default Result;
