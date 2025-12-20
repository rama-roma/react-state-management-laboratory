import { atom } from "jotai";

export interface Todo {
  id: number;
  name: string;
}

export const dataAtom = atom<Todo[]>([]);
export const dataById = atom<Todo | null>(null);

const url = "https://to-dos-api.softclub.tj/api/categories";

export const getAtom = atom(
  null,
  async (get, set) => {
    try {
      const response = await fetch(url);
      const data: Todo[] = await response.json();
      set(dataAtom, data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getbyId = atom(
  null,
  async (get, set, id: number) => {
    try {
      const response = await fetch(`${url}/${id}`);
      const data: Todo = await response.json();
      set(dataById, data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAtom = atom(
  null,
  async (get, set, id: number) => {
    try {
      await fetch(`${url}?id=${id}`, {
        method: "DELETE",
      });
      set(getAtom);
    } catch (error) {
      console.log(error);
    }
  }
);

export const addAtom = atom(
  null,
  async (get, set, newUser: Omit<Todo, "id">) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data: Todo = await res.json();
      const prev = get(dataAtom);
      set(dataAtom, [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  }
);


export const editAtom = atom(
  null,
  async (get, set, updateUser: Todo) => {
    try {
      const res = await fetch(`${url}/${updateUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      const data: Todo = await res.json();

      const prev = get(dataAtom);
      const updated = prev.map((item) =>
        item.id === data.id ? data : item
      );

      set(dataAtom, updated);
    } catch (error) {
      console.log(error);
    }
  }
);

