import { create } from "zustand";

const url = "https://69462253ed253f51719d23ca.mockapi.io/users";

export interface Todo{
  id: number;
  name: string;
  status: boolean;
}

interface TodoStore {
  data: Todo[];
  dataById: Todo | null;

  getZustand: () => Promise<void>;
  getIdZustand: (id: number) => Promise<void>;
  deleteZustand: (id: number) => Promise<void>;
  addZustand: (user: Omit<Todo, "id">) => Promise<void>;
  editZustand: (user: Todo) => Promise<void>;
  checkoutZustand: (id: number) => Promise<void>;
}

export const useTodos = create<TodoStore>((set, get) => ({
  data: [],
  dataById: null,

  getZustand: async () => {
    try {
      const response = await fetch(url);
      const data: Todo[] = await response.json();
      set({ data });
    } catch (error) {
      console.log(error);
    }
  },

  getIdZustand: async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      const user: Todo = await response.json();
      set({ dataById: user });
    } catch (error) {
      console.log(error);
    }
  },

  deleteZustand: async (id) => {
    try {
      await fetch(`${url}/${id}`, { method: "DELETE" });
      await get().getZustand();
    } catch (error) {
      console.log(error);
    }
  },

  addZustand: async (user) => {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          status: user.status,
        }),
      });
      await get().getZustand();
    } catch (error) {
      console.log(error);
    }
  },

  editZustand: async (user) => {
    try {
      await fetch(`${url}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          status: user.status,
        }),
      });
      await get().getZustand();
    } catch (error) {
      console.log(error);
    }
  },

  checkoutZustand: async (id) => {
    try {
      const user = get().data.find((u) => u.id === id);
      if (!user) return;

      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          status: !user.status,
        }),
      });

      await get().getZustand();
    } catch (error) {
      console.log(error);
    }
  },
}));
