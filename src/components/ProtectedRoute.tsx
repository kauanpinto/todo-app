import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
    const { session, loading } = useAuth();

    if (loading) return <p className="text-center mt-10">Carregando...</p>

    if (!session) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;