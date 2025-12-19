import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './state/redux/store.ts'
import TodoProvider from './state/contextApi/todosApi.tsx'
import ThemeProvider from './state/contextApi/darkMode.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
