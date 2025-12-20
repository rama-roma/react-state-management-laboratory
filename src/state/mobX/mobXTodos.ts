import { makeAutoObservable } from "mobx";

export interface Todo {
  id: number;
  name: string;
  status: boolean;
}

export class Todos {
  data: Todo[] = [];
  dataByID: Todo | null = null;
  url: string = "https://69462253ed253f51719d23ca.mockapi.io/users";

  constructor() {
    makeAutoObservable(this);
  }

  async getData(): Promise<void> {
    try {
      const res = await fetch(this.url);
      const data: Todo[] = await res.json();
      this.data = data;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id: number): Promise<void> {
    try {
      const res = await fetch(`${this.url}/${id}`);
      const data: Todo = await res.json();
      this.dataByID = data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteData(id: number): Promise<void> {
    try {
      await fetch(`${this.url}/${id}`, { method: "DELETE" });
      await this.getData();
    } catch (error) {
      console.error(error);
    }
  }

  async checkData(e: Todo): Promise<void> {
    try {
      await fetch(`${this.url}/${e.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...e, status: !e.status }),
      });
      await this.getData();
    } catch (error) {
      console.error(error);
    }
  }

  async editData(e: Todo): Promise<void> {
    try {
      await fetch(`${this.url}/${e.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...e, name: e.name }),
      });
      await this.getData();
    } catch (error) {
      console.error(error);
    }
  }

  async addData(e: Omit<Todo, "id">): Promise<void> {
    try {
      await fetch(this.url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: e.name,
          status: e.status,
        }),
      });
      await this.getData();
    } catch (error) {
      console.error(error);
    }
  }
}

export const todos = new Todos();
