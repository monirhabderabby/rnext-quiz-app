import React from "react";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  // Retrieve authentication information from custom hook
  const { auth } = useAuth();

  // If user is not authenticated, return null to render nothing
  if (!auth) return null;

  // If user is not authenticated, return null to render nothing
  const { full_name } = auth?.user || {};

  return (
    <div className="text-center mb-12">
      <img
        src="https://avatar.iran.liara.run/public/boy"
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
      />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2
        className="text-4xl font-bold text-gray-700"
        style={{ fontFamily: "Jaro" }}
      >
        {full_name}
      </h2>
    </div>
  );
};

export default Welcome;
