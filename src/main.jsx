import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Registration from './Components/Registration/Registration.jsx'
import Terms from './Components/Terms&Condition/Terms.jsx'
import Order from './Orders/Order.jsx'
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'

const route = createBrowserRouter([{
  path: "/",
  element: <App></App>,
  children:
    [
      { path: "/Login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
      { path: "/terms", element: <Terms></Terms> },
      { path: "/order", element: <PrivateRoute><Order></Order></PrivateRoute> }
    ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>,
)
