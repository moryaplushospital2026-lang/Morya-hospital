import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("morya_admin_token");
  return token ? children : <Navigate to="/morya_plus_the_admin_access_mp/login" replace />;
}
