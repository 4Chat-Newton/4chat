import bcrypt from "bcryptjs";
import {expressjwt} from "express-jwt";
import jwt from "jsonwebtoken";
import express, { response, request } from 'express';


export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

export const validateUser = async function (unHashedPassword: string, hash: string) {
    let success: boolean = await bcrypt.compare(unHashedPassword, hash);
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
    try {
        const result = await db.prepare("UPDATE user SET username = ? WHERE id = ?").run(username, id)
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

export const updateEmail = async function(id, email, db){
    try{
        const result = await db.prepare("UPDATE user SET email = ? WHERE id = ?").run(email, id)
        if(!result){
            console.log(`No email found with email ${email}`);
            return result;
        }
        return result;
    }catch(error){
        console.log(`Error updating email ${email}: ${error}`)
        return null;
    }
}

export const deleteUser = async function (id, db) {
    try {
        await db.prepare("DELETE FROM user WHERE id = ?").run(id)
        return true;
    } catch (error) {
        console.log(`Error deleting user ${error}`);
        return false;
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
    let token = bearerToken.replace("Bearer ", "");

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
    let token = bearerToken.replace("Bearer ", "");

    try {
        jwt.verify(token, "secret_key")
        if (!token) {
            return res.status(401).send("No token found!")
        } else {
            next();
        }
    } catch (e) {
        return res.status(400).send({message: "Token not provided", error: e})
    }
}



