import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CirculerProgress = ({ percentage }) => {
  return (
    <div style={{ width: "80px", height: "80px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#4caf50", // Custom text color
          pathColor: "#4caf50", // Progress bar color
          trailColor: "#d6d6d6", // Background bar color
        })}
      />
    </div>
  );
};

export default CirculerProgress;
