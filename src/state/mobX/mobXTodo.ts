import { makeAutoObservable } from "mobx";

export interface TodoItem {
  id: number;
  name: string;
  status: boolean;
}

export class Todo {
  data: TodoItem[] = [
    { id: 1, name: "Ramziya", status: false },
    { id: 2, name: "Mijgona", status: true },
    { id: 3, name: "Rohila", status: false },
    { id: 4, name: "Sabrina", status: true },
    { id: 5, name: "Maryam", status: false },
    { id: 6, name: "Anisa", status: true },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  deleteUser(id: number) {
    this.data = this.data.filter((e) => e.id !== id);
  }

  addUser(user: TodoItem) {
    this.data.push(user);
  }

  editUser(id: number, updatedUser: Partial<Omit<TodoItem, "id">>) {
    this.data = this.data.map((e) =>
      e.id === id ? { ...e, ...updatedUser } : e
    );
  }

  checkout(id: number) {
    this.data = this.data.map((e) =>
      e.id === id ? { ...e, status: !e.status } : e
    );
  }
}

export const todo = new Todo();
