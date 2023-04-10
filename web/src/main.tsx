import React from 'react'
import ReactDOM from 'react-dom/client'

// Styling
import "./style.css"

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import { Home, Signup, Login, UploadImg, Dashboard } from "./pages"

// Context
import { UserProvider } from './utils/UserContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/upload-img',
    element: <UploadImg />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
