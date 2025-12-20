import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './state/redux/store'
import TodoProvider from './state/contextApi/todosApi'
import ThemeProvider from './state/contextApi/darkMode'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <TodoProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </TodoProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
