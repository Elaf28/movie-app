import { Navigate} from "react-router";
import { useAuthStore } from "../Store/zustand/useAuthStore";

const ProtectedRoute = ({ children }) => {
    const user = useAuthStore((state) => state.user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;