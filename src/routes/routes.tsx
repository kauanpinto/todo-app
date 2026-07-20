import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        element: <ProtectedRoute />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
]);
