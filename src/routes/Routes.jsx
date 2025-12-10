import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../layout/Dashboard";
import ErrorPage from "../pages/Shared/ErrorPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>, 
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>, 
    children: [
      {
        path: 'my-tuitions',
        element: <div>My Tuitions Page</div> 
      },
      {
        path: 'users',
        element: <div>Manage Users Page</div>
      },
      {
        path: 'my-applications',
        element: <div>My Applications Page</div>
      }
    ]
  }
]);