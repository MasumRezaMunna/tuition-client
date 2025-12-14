import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (user && role === 'student') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;