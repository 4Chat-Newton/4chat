import bcrypt from "bcryptjs";
import express from "express";
import {expressjwt, Request as JWTRequest} from "express-jwt";
import jwt from "jsonwebtoken";

export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

export const validateUser = async function (password: string, hash: string) {
    let success: boolean = await bcrypt.compare(password, hash);
    return success;
};

export const findUser = async function (email, db) {
    try {
        const result = db
            .prepare(
                "SELECT id, email, username, password FROM user WHERE email = ?"
            )
            .get(email);

        if (!result) {
            console.log(`No user found with email ${email}`);
            return result;
        }
        return result;
    } catch (error) {
        console.error(`Error finding user with email ${email}: ${error}`);
        return null;
    }
};


//TODO Fix so it returns a user
export const returnUser = (req: express.Request, res: express.Response) => {
    expressjwt({
        secret: "secret_key",
        algorithms: ["HS256"],
    })
    let result = {
        id: "",
        isLoggedIn: false,
        username: ""
    }
    const token = req.headers['authorization']

    if (!token) {
        return result
    } else {
        try {
            const data = jwt.verify(token, "secret_key");
            result.id = Object(data)["id"]
            result.username = Object(data)["username"]
            result.isLoggedIn = true

            return result
        } catch (e) {
            result.isLoggedIn = false
            return result
        }
    }
}

export const verifyJWT = (req: express.Request, res: express.Response, next) => {
    expressjwt({
        secret: "secret_key",
        algorithms: ["HS256"],
    })
    const authHeader = req.headers['authorization']
    console.log("verifyJWT", authHeader)
    jwt.verify(authHeader, "secret_key")

    if (!authHeader) {
        return res.status(401).send("No token found!")
    } else {
        next();
    }
}