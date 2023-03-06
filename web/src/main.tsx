import React from 'react'
import ReactDOM from 'react-dom/client'

// Styling
import "./style.css"

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import {Home, Signup, Login, UploadImg} from "./pages"

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
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
