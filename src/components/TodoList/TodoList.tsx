import "./TodoList.css";
import {
  addTodo,
  clearTodos,
  FilterValue,
  setFilter,
} from "../../features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../app/store";

type TodoListProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoList = ({ setIsLoggedIn }: TodoListProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState("");
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);
  const dispatch = useAppDispatch();

  const filteredTodos = {
    all: todos.filter((todo) => !todo.movedToBin),
    active: todos.filter((todo) => !todo.checked && !todo.movedToBin),
    completed: todos.filter((todo) => todo.checked && !todo.movedToBin),
    bin: todos.filter((todo) => todo.movedToBin),
  };

  const handleFilterChange = (newFilter: FilterValue) => {
    dispatch(setFilter(newFilter));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearTodos = () => {
    dispatch(clearTodos());
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      dispatch(addTodo(inputValue));
      setInputValue("");
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    persistor.purge();
    navigate("/auth");
  };

  return (
    <div className="todo">
      <div className="todo__container">
        <button className="todo__button todo__button_exit" onClick={logOut}>
          Выход
        </button>
        <form className="todo__header" onSubmit={handleAddTodo}>
          <button className="todo__button todo__button_add">Добавить</button>
          <input
            className="todo__input"
            type="text"
            placeholder="Новая задача"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="todo__button todo__button_clear"
            onClick={handleClearTodos}
          >
            Очистить
          </button>
        </form>
        <div className="todo__content">
          <div className="todo__filters">
            {(["active", "all", "completed", "bin"] as FilterValue[]).map(
              (filterType) => (
                <button
                  key={filterType}
                  className={`todo__filter-button ${
                    filter === filterType && "todo__filter-button_active"
                  }`}
                  onClick={() => handleFilterChange(filterType)}
                >
                  {filterType === "active" && "Текущие дела "}
                  {filterType === "all" && "Все дела "}
                  {filterType === "completed" && "Выполненные дела "}
                  {filterType === "bin" && "Корзина "}
                  <span>
                    {filteredTodos[filterType].length
                      ? `(${filteredTodos[filterType].length})`
                      : ""}
                  </span>
                </button>
              )
            )}
          </div>
          {filteredTodos[filter].length === 0 ? (
            <div className="todo__empty">Список пуст</div>
          ) : (
            <div className="todo__list">
              {filteredTodos[filter].map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
