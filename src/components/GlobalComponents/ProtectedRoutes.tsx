import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    //TODO actual logic for handling tokens

    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/" />
    )
};

export default ProtectedRoutes