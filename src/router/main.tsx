import { AdminLayout } from "@/layouts";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminRoutes } from "./config";
import { Login } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      ...Object.values(AdminRoutes).map(({ path, element }) => ({
        path,
        element,
      })),
      {
        path: "/admin/*",
        element: <Navigate to="/admin" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
]);
