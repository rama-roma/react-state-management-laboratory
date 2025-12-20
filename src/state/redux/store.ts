// store.ts
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./reducers/todoSlice";
import todosSlice from "./reducers/todosSlice";
import { todo } from "./api/rtk";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    todos: todosSlice,
    [todo.reducerPath]: todo.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todo.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
