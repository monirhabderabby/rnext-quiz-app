import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoutes = () => {
  // Retrieve authentication information from custom hook
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  if (!auth) {
    return <Navigate to="/login" />;
  }

  // If user is not authenticated, return null to render nothing
  // Check if user role includes 'admin'
  const isAdmin = auth.user?.role?.includes("admin");

  // If user is not authenticated, return null to render nothing

  return <>{isAdmin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default AdminRoutes;
