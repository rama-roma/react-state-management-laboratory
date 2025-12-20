const API = "https://to-dos-api.softclub.tj/api/to-dos";

export interface Todo {
  id: number;
  name: string;
  status?: boolean;
}

export const getUser = async (): Promise<Todo[] | undefined> => {
  try {
    const response = await fetch(API);
    const data: Todo[] = await response.json();
    return data;    
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await fetch(`${API}?id=${id}`, { method: "DELETE" });    
  } catch (error) {
    console.error(error);
  }
};

export const deleteImage = async (id: number): Promise<void> => {
  try {
    await fetch(`${API}/images/${id}`, { method: "DELETE" });    
  } catch (error) {
    console.error(error);
  }
};

export const editUser = async (user: Todo): Promise<Todo | undefined> => {
  try {
    const response = await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data: Todo = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (formData: FormData): Promise<Todo | undefined> => {
  try {
    const response = await fetch(API, { method: "POST", body: formData });
    const data: Todo = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addImage = async (obj: { id: number; formData: FormData }): Promise<any> => {
  try {
    const response = await fetch(`${API}/${obj.id}/images`, {
      method: "POST",
      body: obj.formData,
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const checkout = async (id: number): Promise<void> => {
  try {
    await fetch(`https://to-dos-api.softclub.tj/completed?id=${id}`, { method: "PUT" });
  } catch (error) {
    console.error(error);
  }
};

export const getById = async (id: number): Promise<Todo | undefined> => {
  try {
    const response = await fetch(`${API}/${id}`);
    const data: Todo = await response.json();
    return data;  
  } catch (error) {
    console.error(error);
  }
};
