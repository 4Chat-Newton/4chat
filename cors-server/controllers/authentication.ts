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

export const returnId = (req: express.Request, res: express.Response) => {
    expressjwt({
        secret: "secret_key",
        algorithms: ["HS256"],
    })
    let result = {
        id: "",
        status: false
    }

    const data:any = req.headers["x-access-token"]
    const token = JSON.parse(data).slice(1, -1)
    console.log("returnID: ", token)

    if (!token) {
        return result
    } else {
        try {
            const data = jwt.verify(token, "secret_key");
            result.id = Object(data)["id"]
            result.status = true

            return result

        } catch (e) {

            result.status = false
            return result
        }
    }
}

export const verifyJWT = (req: express.Request, res: express.Response) => {
    expressjwt({
        secret: "secret_key",
        algorithms: ["HS256"],
    })

    const token:any = req.headers["x-access-token"]

    console.log(token)

    jwt.verify(token, "secret_key")

    if (!token) {
        return res.status(401).send("No token found!")
    } else {
        return res.status(200).send("Found Token!")
    }
}