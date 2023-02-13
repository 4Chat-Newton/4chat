import { response } from "express";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    //TODO actual logic for handling tokens
    const jwtToken = localStorage.getItem('token') //this could work if we use localstorage
    // const getToken = async () => {
    //     await fetch('http://localhost:8080/data/login', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` },
    //     }).then(response => {
    //         if(jwtToken !==null){
    //             return true
    //         } else {
    //             return false
    //         }
    //     })
    // }

    let auth = { jwtToken }
    return (
        auth ? <Outlet /> : <Navigate to="/" />
    )
};

export default ProtectedRoutes