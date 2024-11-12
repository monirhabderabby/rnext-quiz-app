import React from "react";
import { useParams } from "react-router-dom";

const Leaderboard = () => {
  const { id } = useParams();
  return <div>Leaderboard: {id}</div>;
};

export default Leaderboard;
