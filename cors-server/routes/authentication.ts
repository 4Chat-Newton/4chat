import bcrypt from "bcrypt";
import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";

import {server} from "../server";

export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

export const validateUser = async function (password: string, hash: string) {
    let success: boolean = await bcrypt.compare(password, hash);
    return success;
};

// export const findUser = async function (email, db) {
//     try {
//         const query = "SELECT id, email, password FROM user WHERE email = ?";
//         let result
//         await db.get(query, email, (err, rows) => {
//             if (err) console.log(err);
//             console.log(rows);

//             result = rows;
//         });

//         if (!result) {
//             console.log(`No user found with email ${email}`);
//             return null;
//         }
//         return result;
//     } catch (error) {
//         console.error(`Error finding user with email ${email}: ${error}`);
//         return null;
//     }
// };
export const findUser = async function (email, db) {
    try {
        const result = db
            .prepare("SELECT id, email, username FROM user WHERE email = ?")
            .get(email);
        console.log(result.id, result.username, result.email);

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



export const signIn = async function (server, db: any, newLogin: boolean) {
    if (newLogin) {
        server.post("/data/login", async (req: Request, res: Response) => {
            // Extract the user's credentials from the request body
            const { email, password } = req.body;
            // Verify the user's credentials against the database
            try {
                const user = await findUser(email, db);

                if (!user) {
                    return res
                        .status(401)
                        .json({ error: "R70 Invalid username or password.." });
                }
                console.log("r108", user);

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
                console.log("r122", token);

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
