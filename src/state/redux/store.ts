import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./reducers/todoSlice";
import todosSlice from "./reducers/todosSlice";

export const store = configureStore({
    reducer: {
        todo: todoSlice,
        todos: todosSlice
    }
})