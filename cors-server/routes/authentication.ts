import bcrypt from "bcrypt";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import session from "express-session"
import {server} from "../server";

export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

export const validateUser = async function (password: string, hash: string) {
    console.log("r14 password ", password," hash ", hash);
    
    let success: boolean = await bcrypt.compare(password, hash);
    return success;
};

export const findUser = async function (email, db) {
    try {
        const result = db
            .prepare("SELECT id, email, username, password FROM user WHERE email = ?")
            .get(email);
        console.log(result.id, result.username, result.email);

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



export const signIn = async function (server, db: any, newLogin: boolean) {
    if (newLogin) {
        server.post("/data/login", async (req: Request, res: Response) => {
            // Extract the user's credentials from the request body
            const { email, password } = req.body;
            // Verify the user's credentials against the database
            try {
                const user = await findUser(email, db);
                console.log("r49",user);
                
                if (!user) {
                    return res
                        .status(401)
                        .json({ error: "r54 Invalid username or password.." });
                }
                console.log("r56", user);

                const isValid = await validateUser(password, user.password);
                
                if (!isValid) {
                    return res
                        .status(401)
                        .json({ error: "Invalid username or password.." });
                }
                console.log("r66", user)
                // Create a new JWT with the user's information
                const payload = { id: user.id };
                const options = {
                    expiresIn: "2h",
                };
                const secret_key = "secret_key"
                
                const token = jwt.sign(payload, secret_key, options);
                console.log("r73 token ", token);

                // Store the JWT in the user's session
                // req.body.session.jwt = token;
                user.password = undefined;
                res.cookie("token", token, {
                    httpOnly: true,
                    //secure: true, // only works on https    
                });
                console.log("r80", req.header);
                
                res.status(200).json({ loggedIn: true });

                return res.json(user);
            } catch (err) {
                // delete req.body.session.jwt;
                return res
                    .status(500)
                    .json({ error: "R.129 Internal server error" });
            }
        });
    } else {
        server.get("/data/login", async (req: Request, res: Response) => {
            // Extract the user's credentials from the request body
            const { email, password } = req.body;

            //! Check if JWT cookie exists
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
