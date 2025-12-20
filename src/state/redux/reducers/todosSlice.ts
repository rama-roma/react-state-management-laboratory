import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Image {
  id: number;
  imageName: string;
}

export interface Todos {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  images: Image[];
}

interface TodosState {
  data: Todos[];
  dataById: Todos | null;
}

const initialState: TodosState = {
  data: [],
  dataById: null,
};

const API = "https://to-dos-api.softclub.tj/api/to-dos";

export const getRedux = createAsyncThunk<Todos[]>(
  "todos/getRedux",
  async () => {
    const response = await fetch(API);
    const data: Todos[] = await response.json();
    return data.data;
  }
);

export const getbyIdRedux = createAsyncThunk<Todos, number>(
  "todos/getbyIdRedux",
  async (id: number) => {
    const response = await fetch(`${API}/${id}`);
    const data = await response.json();
    return data.data;
  }
);

export const deleteRedux = createAsyncThunk(
  "todos/deleteRedux",
  async (id: number, { dispatch }) => {
    await fetch(`${API}?id=${id}`, {
      method: "DELETE",
    });
    dispatch(getRedux());
  }
);

export const deleteImageRedux = createAsyncThunk(
  "todos/deleteImageRedux",
  async (id: number, { dispatch }) => {
    await fetch(`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`, {
      method: "DELETE",
    });
    dispatch(getRedux());
  }
);

export const addRedux = createAsyncThunk<void, FormData>(
  "todos/addRedux",
  async (formData, { dispatch }) => {
    await fetch(API, {
      method: "POST",
      body: formData,
    });
    dispatch(getRedux());
  }
);

export const addImageRedux = createAsyncThunk<
  void,
  { id: number | null; formData: FormData }
>("todos/addImageRedux", async (obj, { dispatch }) => {
  await fetch(`https://to-dos-api.softclub.tj/api/to-dos/${obj.id}/images`, {
    method: "POST",
    body: obj.formData,
  });
  dispatch(getRedux());
});

export const editRedux = createAsyncThunk<
  void,
  { id: number; name: string; description: string }
>("todos/editRedux", async ({ id, name, description }, { dispatch }) => {
  await fetch(API, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, description }),
  });
  dispatch(getRedux());
});

export const checkoutRedux = createAsyncThunk<void, { id: number }>(
  "todos/checkoutRedux",
  async (id, { dispatch }) => {
    await fetch(`https://to-dos-api.softclub.tj/completed?id=${id}`, {
      method: "PUT",
    });
    dispatch(getRedux());
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getRedux.fulfilled,
      (state, action: PayloadAction<Todos[]>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      getbyIdRedux.fulfilled,
      (state, action: PayloadAction<Todos>) => {
        state.dataById = action.payload;
      }
    );
  },
});

export default todosSlice.reducer;
