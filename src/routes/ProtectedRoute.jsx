import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // ❌ Not logged in → force login
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow page
  return children;
};

export default ProtectedRoute;
