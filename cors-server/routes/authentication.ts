import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import sqlite from "sqlite3";
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
        const query = "SELECT id, email, password FROM user WHERE email = ?";
        let result = {}

        await db.get(query, [email], (err, rows) => {
            if (err) console.log(err);
            console.log(rows);
            result = rows
            return rows;
        });
        console.log("r22", result);

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

export const registerUser = async function (server, db: sqlite.Database) {
    server.post(
        "/data/register",
        async (request: Request, response: Response) => {
            const { username, email, password } = request.body;
            const encryptedPassword = await encryptPassword(password);
            const query =
                "INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)";

            try {
                await db.run(
                    query,
                    [username, email, encryptedPassword, true],
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

export const signIn = async function (
    server,
    db: sqlite.Database,
    newLogin: boolean
) {
    if (newLogin) {
        server.post("/data/login", async (req: Request, res: Response) => {
            // Extract the user's credentials from the request body
            const { email, password } = req.body;
            // Verify the user's credentials against the database
            try {
                const user = await findUser(email, db);
                console.log("r72", user);

                if (!user) {
                    return res
                        .status(401)
                        .json({ error: "R70 Invalid username or password.." });
                }
                console.log("r99", user);

                const isValid = await validateUser(password, user.password);
                if (!isValid) {
                    return res
                        .status(401)
                        .json({ error: "Invalid username or password.." });
                }
                // Create a new JWT with the user's information
                const payload = { email: user.email };
                const options = {
                    expiresIn: "2h",
                };
                const token = jwt.sign(payload, "secret_key", options);
                console.log("r83", token);

                // Store the JWT in the user's session
                req.body.session.jwt = token;
                res.status(200).json({ loggedIn: true });

                return res.json({ token });
            } catch (err) {
                // delete req.body.session.jwt;
                return res
                    .status(500)
                    .json({ error: "R.89 Internal server error" });
            }
        });
    } else {
        server.get("/data/login", async (req: Request, res: Response) => {
            // Extract the user's credentials from the request body
            const { email, password } = req.body;

            // Check if user sessions exists
            if (req.body.session.jwt) {
                try {
                    const data = jwt.verify(req.body.session.jwt, "secret_key");
                    console.log(data);
                } catch (err) {
                    return res.status(401).json({ error: "Invalid token" });
                }
            } else {
                return res.status(401).json({ error: "No active session" });
            }
        });
    }
};

export default { encryptPassword, validateUser, signIn };
