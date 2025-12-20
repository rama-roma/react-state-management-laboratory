🚀 React State Management Laboratory

This project is a laboratory for experimenting with various state management approaches in React.
It demonstrates handling synchronous & asynchronous data, working with APIs, managing forms, and integrating with different UI libraries.

🛠️ Technologies Used

React + TypeScript + Vite – core stack of the project

TailwindCSS – utility-first CSS for styling

Ant Design (AntD) & Material UI (MUI) – ready-made beautiful components

Redux Toolkit

🔹 Synchronous reducers (sync)

🔹 Asynchronous operations with createAsyncThunk (async)

🔹 RTK Query for API integration (async + swagger (todos))

Zustand

🔹 Synchronous data (sync)

🔹 Asynchronous data with Mock API (async + mockapi)

Jotai

🔹 Synchronous & asynchronous data (sync + async)

🔹 Form handling with Formik

🔹 Swagger API integration for categories (swagger(category))

MobX

🔹 Observable state management (sync + async)

🔹 Mock API integration (mockapi)

React Context

🔹 Local state management (sync)

🔹 Dark Mode implementation (darkmode)

TanStack Query (React Query)

🔹 Asynchronous API requests

🔹 Integration with Swagger API for Todos (async + swagger(todos))

📂 Project Structure
src/
├─ pages/
│  ├─ reduxPages/        // Redux Toolkit examples
│  ├─ zustandPages/      // Zustand examples
│  ├─ jotaiPages/        // Jotai examples
│  ├─ mobxPages/         // MobX examples
│  ├─ contextPages/      // React Context examples
│  ├─ tanStackPages/     // TanStack Query examples
├─ state/                // State slices & stores
├─ components/           // Reusable components
├─ api/                  // API configurations
├─ assets/               // Images & static assets
├─ App.tsx               // Main app entry
└─ main.tsx              // React entry point

✨ Features

✅ Todos CRUD – create, read, update, delete todos

🖼️ Image upload – attach images to todos

🔍 Filtering & search – filter todos by status & search by name

🌙 Dark Mode – toggle dark/light theme via Context API

📝 Form handling – forms with validation using Formik

🔄 State comparison – see differences between Redux, Zustand, Jotai, MobX, Context & TanStack Query

🌐 Async API integration – fetch & manipulate data with real or mock APIs