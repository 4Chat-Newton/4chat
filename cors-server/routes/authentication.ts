import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { server } from "../server";

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

    const result = db.prepare("SELECT id, email, username FROM user WHERE email = ?").get(email);
    console.log(result.id, result.username, result.email)
    return result

        if (!result) {
            console.log(`No user found with email ${email}`);
            return null;
        }
        return result;

    } catch (error) {
        console.error(`Error finding user with email ${email}: ${error}`);
        return null;
    }
};

export const registerUser = async function (server, db: any) {
    server.post("/data/register", async (request: Request, response: Response) => {
            const { username, email, password } = request.body;
            const encryptedPassword = await encryptPassword(password);
            const query = "INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)";
            try {
                await db.prepare(query).get(username, email, encryptedPassword, true)
                    (err, rows) => {
                        if (!err) {
                            response.json({ userCreated: true });
                        } else {
                            response.status(400).json({
                                error: "username or email already in use",
                                userCreated: false,
                            });
                        }
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
    );
};

export default { encryptPassword, validateUser, signIn };
