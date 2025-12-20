import { atom } from "jotai";

export interface Todo {
  id: number;
  name: string;
  status: boolean;
}

export const dataAtom = atom<Todo[]>([
  { id: 1, name: "Ramziya", status: false },
  { id: 2, name: "Mijgona", status: true },
  { id: 3, name: "Rohila", status: false },
  { id: 4, name: "Sabrina", status: true },
  { id: 5, name: "Maryam", status: false },
  { id: 6, name: "Anisa", status: true },
]);

export const deleteAtom = atom(
  null,
  (get, set, id: number) => {
    const prev = get(dataAtom);
    const update = prev.filter((item) => item.id !== id);
    set(dataAtom, update);
  }
);

export const editAtom = atom(
  null,
  (get, set, updated: Todo) => {
    const prev = get(dataAtom);
    const update = prev.map((item) =>
      item.id === updated.id ? { ...item, ...updated } : item
    );
    set(dataAtom, update);
  }
);

export const addAtom = atom(
  null,
  (get, set, newUser: Todo) => {
    const prev = get(dataAtom);
    const update = [...prev, newUser];
    set(dataAtom, update);
  }
);

export const checkedbox = atom(
  null,
  (get, set, id: number) => {
    const prev = get(dataAtom);
    const update = prev.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    set(dataAtom, update);
  }
);
