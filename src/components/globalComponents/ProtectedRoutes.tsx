import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {

    const getToken = () => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken !== null) {
            return true
        } else {
            return false
        }
    }

    return (
        getToken() ? <Outlet /> : <Navigate to="/" />
    )
};

export default ProtectedRoutes