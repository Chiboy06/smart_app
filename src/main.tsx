import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Departments from './components/Departments.tsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Departments />
  },
  {
    path: '/department',
    element: <Departments/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
