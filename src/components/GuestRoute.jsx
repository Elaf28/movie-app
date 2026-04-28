import { Navigate } from "react-router";
import { useAuthStore } from "../Store/zustand/useAuthStore";

const GuestRoute = ({ children }) => {
    const user = useAuthStore((state) => state.user);
    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default GuestRoute;