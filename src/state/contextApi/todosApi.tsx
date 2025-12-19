import { createContext, useState } from "react";

export interface Todo {
  id: number;
  name: string;
  status: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (name: string, status: boolean) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newName: string, newStatus: boolean) => void;
  toggleStatus: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

function TodoProvider({ children }: { children: any }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, name: "Ramziya", status: false },
    { id: 2, name: "Rohila", status: true },
    { id: 3, name: "Migjona", status: false },
    { id: 4, name: "Damir", status: true },
    { id: 5, name: "Najibulloh", status: true },
  ]);

  const addTodo = (name: string, status: boolean) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), name, status },
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: number, newName: string, newStatus: boolean) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, name: newName, status: newStatus } : t
      )
    );
  };

  const toggleStatus = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: !t.status } : t
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, editTodo, toggleStatus }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
