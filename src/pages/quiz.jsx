import React from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams();
  return <div>Quiz: {id}</div>;
};

export default Quiz;
