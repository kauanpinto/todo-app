import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import { ProtectedRoute, PublicRoute } from "../components/auth";

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
        ],
    },
    { path: "/reset-password", element: <ResetPassword /> },
    {
        element: <ProtectedRoute />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
]);
