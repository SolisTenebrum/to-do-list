import "./TodoItem.css";
import { useAppDispatch } from "../../app/hooks";
import {
  removeTodo,
  Todo,
  toggleBin,
  toggleTodo,
} from "../../features/todo/todoSlice";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleToggleBin = () => {
    dispatch(toggleBin(todo.id));
  };

  const handleToggleTodo = () => {
    dispatch(toggleTodo(todo.id));
  };

  return (
    <div className="todo__item" key={todo.id}>
      <p className="todo__item-text">{todo.text}</p>
      <div className="todo__item-buttons">
        {todo.movedToBin ? (
          <button
            className="todo__item-button todo__item-button_recover"
            onClick={handleToggleBin}
          >
            Восстановить
          </button>
        ) : (
          <button
            className={`todo__item-button todo__item-button_complete ${
              todo.checked && "todo__item-button_uncomplete"
            }`}
            onClick={handleToggleTodo}
          >
            {todo.checked ? "Отменить выполнение" : "Выполнить"}
          </button>
        )}
        {todo.movedToBin ? (
          <button
            className="todo__item-button todo__item-button_delete"
            onClick={handleDelete}
          >
            Удалить
          </button>
        ) : (
          <button
            className="todo__item-button todo__item-button_delete"
            onClick={handleToggleBin}
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
