import bcrypt from "bcryptjs";
import express from "express";
import {expressjwt} from "express-jwt";
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
export const updateUserName = async function (id, username, db) {
    console.log(username, id)
    try {
        const result = await db.prepare("UPDATE user SET username = ? WHERE id = ?").run(username, id)
        console.log(result)
        if (!result) {
            console.log(`No user found with username ${username}`);
            return result;
        }
        return result;
    } catch (error) {
        console.error(`Error updating username ${username}: ${error}`);
        return null;
    }
};

export const updateUserPassword = async function (id, encryptedPassword, db) {
    console.log(encryptedPassword, id)
    try {
        const result = await db.prepare("UPDATE user SET password = ? WHERE id = ?").run(encryptedPassword, id)
        console.log(result)
        if (!result) {
            console.log(`Wrong password ${encryptedPassword}`);
            return result;
        }
        return result;
    } catch (error) {
        console.error(`Error updating password ${encryptedPassword}: ${error}`);
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
    let bearerToken = req.headers['authorization']
    let token  = bearerToken.replace("Bearer ", "");

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
    let bearerToken = req.headers['authorization']
    let token  = bearerToken.replace("Bearer ", "");

    jwt.verify(token, "secret_key")

    if (!token) {
        return res.status(401).send("No token found!")
    } else {
        next();
    }
}