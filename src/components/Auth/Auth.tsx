import React from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = React.useState({
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValues.name !== "admin" || inputValues.password !== "admin") {
      alert("Неверное имя или пароль");
    }
    if (inputValues.name === "admin" && inputValues.password === "admin") {
      navigate("/todo");
      localStorage.setItem("isLoggedIn", "true");
    }
  };

  React.useEffect(() => {
    setInputValues({
      name: "",
      password: "",
    });
  }, []);

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__body">
          <h1 className="auth__title">Вход</h1>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              className="auth__input"
              placeholder="Имя"
              type="text"
              name="name"
              onChange={handleChange}
              value={inputValues.name}
              required
            />
            <input
              className="auth__input"
              placeholder="Пароль"
              type="password"
              name="password"
              onChange={handleChange}
              value={inputValues.password}
              required
            />
            <button className="auth__button" type="submit">
              Вход
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
