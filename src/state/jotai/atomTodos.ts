import { atom } from "jotai";

export interface Todo {
  id: number,
  name: string
}

export const dataAtom = atom<Todo[]>([]);
export const dataById = atom<Todo | null>(null);


const url = "https://to-dos-api.softclub.tj/api/categories";

export const getAtom = atom(null, async (get, set) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    set(dataAtom, result.data);
  } catch (error) {
    console.log(error);
  }
});

export const getbyId = atom(null, async (get, set, id: number) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const result: Todo = await response.json();
    set(dataById, result.data);
  } catch (error) {
    console.log(error);
  }
});



export const deleteAtom = atom(null, async (get, set, id: number) => {
  try {
    await fetch(`${url}?id=${id}`, {
      method: "DELETE",
    });
    set(getAtom);
  } catch (error) {
    console.log(error);
  }
});

export const addAtom = atom(null, async (get, set, newUser: Omit<Todo, 'id'>) => {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    await set(getAtom);
  } catch (e) {
    console.log(e);
  }
});



export const editAtom = atom(null, async (get, set, updateUser: Todo) => {
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser), 
    });
    set(getAtom);
  } catch (error) {
    console.log(error);
  }
});

