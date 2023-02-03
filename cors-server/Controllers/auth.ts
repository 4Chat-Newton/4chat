import { expressjwt, Request as JWTRequest } from "express-jwt";
import express from "express";

export const requireSignin = (req: express.Request, res: express.Response) => {
    expressjwt({
        secret: "secret_key",
        algorithms: ["HS256"],
    })
    if (!req.cookies.token) {
        return res.status(401).json({ error: "Token not found!", status: false })
    }  
    return res.status(200).json({ msg: "Token found!", status: true});
 
}
