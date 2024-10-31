import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  checked: boolean;
  movedToBin: boolean;
}

export interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed" | "bin";
  nextId: number;
}

const initialState: TodoState = {
  todos: [],
  filter: "all",
  nextId: 0,
};

export type FilterValue = "all" | "active" | "completed" | "bin";

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.nextId,
        text: action.payload,
        checked: false,
        movedToBin: false,
      };

      state.todos.push(newTodo);
      state.nextId++;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearTodos: (state) => {
      state.todos = [];
      state.nextId = 0;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos[action.payload];
      if (todo) {
        todo.checked = !todo.checked;
      }
    },
    toggleBin: (state, action: PayloadAction<number>) => {
      const todo = state.todos[action.payload];
      if (todo) {
        todo.movedToBin = !todo.movedToBin;
      }
    },
    setFilter: (state, action: PayloadAction<FilterValue>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  clearTodos,
  toggleTodo,
  toggleBin,
  setFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
