import { getCurrentUser } from "aws-amplify/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser } from "../features/auth/AuthSlice";
import Splash from "../screens/Splash";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = React.useState(true);

  if (isLoading) return <Splash setIsLoading={setIsLoading} />;

  // const userId = useSelector((state) => state.auth.user.userId);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
