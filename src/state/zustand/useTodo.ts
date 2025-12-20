import { create } from "zustand";

export const useTodo = create((set) => ({
  data: [
    { id: 1, name: "Ramziya", status: false },
    { id: 2, name: "Mijgona", status: true },   
    { id: 3, name: "Rohila", status: false },
    { id: 4, name: "Sabrina", status: true },
    { id: 5, name: "Maryam", status: false },
    { id: 6, name: "Anisa", status: true },
  ] as {
    id: number;
    name: string;
    status: boolean;
  }[],

  deleteUser: (id: number) =>
    set((state: any) => ({
      data: state.data.filter((item: any) => item.id !== id),
    })),

  editUser: (id: number, name: string, status: boolean) =>
    set((state: any) => ({
      data: state.data.map((item: any) =>
        item.id === id ? { ...item, name, status } : item
      ),
    })),

  addUser: (name: string, status: boolean) =>
    set((state: any) => ({
      data: [
        ...state.data,
        {
          id: Date.now(),
          name,
          status,
        },
      ],
    })),

  checkout: (id: number) =>
    set((state: any) => ({
      data: state.data.map((item: any) =>
        item.id === id ? { ...item, status: !item.status } : item
      ),
    })),
}));
