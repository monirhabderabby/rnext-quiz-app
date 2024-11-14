// Packages
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Local imports
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Side effect to update loading state once authentication is determined
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (!isLoading && !auth) {
    return <Navigate to="/login" />;
  }

  return isLoading ? null : children;
};

export default PrivateRoutes;
