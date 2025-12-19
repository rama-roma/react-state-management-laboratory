import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [
        {
            id: 1,
            name: "Ramziya",
            status: false
        },
        {
            id: 2,
            name: "Mijgona",
            status: true
        },
        {
            id: 3,
            name: "Rohila",
            status: false
        },
        {
            id: 4,
            name: "Sabrina",
            status: true
        },
        {
            id: 5,
            name: "Maryam",
            status: false
        },
        {
            id: 6,
            name: "Anisa",
            status: true
        }
    ]
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        deleteUser: (state, action) => {
            state.data = state.data.filter((e) => e.id !== action.payload)
        },
        addUser: (state,action) => {
            state.data.push(action.payload)
        },
        editUser: (state, action) => {
            const { id, name, status } = action.payload;
            state.data = state.data.map(item => item.id === id ? {...item, name, status} : item)
        },
        checkout: (state, action) => {
            const id = action.payload;
            state.data = state.data.map(item => item.id === id ? {...item, status: !item.status} : item)
        }
    }
})
export const { deleteUser, addUser, editUser, checkout } = todoSlice.actions
export default todoSlice.reducer;