import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../layout/Dashboard";
import ErrorPage from "../pages/Shared/ErrorPage";

import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import PrivateRoute from "./PrivateRoute";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MyApplications from "../pages/Dashboard/Tutor/MyApplications";
import CreateTuition from "../pages/Dashboard/Student/CreateTuition";
import MyTuitions from "../pages/Dashboard/Student/MyTuitions";
import ManageTuitions from "../pages/Dashboard/Admin/ManageTuitions";
import AllTuitions from "../pages/Tuition/AllTuitions";
import Profile from "../pages/Dashboard/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "tuitions",
        element: <AllTuitions />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>
        ),
      },
      {
        path: "my-tuitions",
        element: (
          <StudentRoute>
            <MyTuitions />
          </StudentRoute>
        ),
      },
      {
        path: "post-tuition",
        element: (
          <StudentRoute>
            <CreateTuition />
          </StudentRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-tuitions",
        element: (
          <AdminRoute>
            <ManageTuitions />
          </AdminRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <TutorRoute>
            <MyApplications />
          </TutorRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
