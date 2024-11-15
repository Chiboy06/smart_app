import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx'
import Department from './components/Departments.tsx'
// import { Toaster } from "../components/ui/sonner"
import { Toaster } from "./components/ui/sonner"



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/department',
    element: <Department/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster richColors position="top-center"/>
    </BrowserRouter>
  </StrictMode>,
)
