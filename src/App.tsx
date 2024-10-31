import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import TodoList from "./components/TodoList/TodoList";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import React from "react";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/todo");
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute redirectTo="/auth">
              <TodoList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
