import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
  redirectTo: string;
};

const ProtectedRoute = ({ children, redirectTo }: ProtectedRouteProps) => {
  return localStorage.getItem("isLoggedIn") === "true" ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default ProtectedRoute;
