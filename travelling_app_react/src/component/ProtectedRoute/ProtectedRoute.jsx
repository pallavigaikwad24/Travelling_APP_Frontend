import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => state.protected.isAuthenticated);

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
