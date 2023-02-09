import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import { findUser, validateUser } from "../controllers/authentication";

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
                        .json({ error: "Invalid credentials!" });
                }

                const isValid = await validateUser(password, user.password);

                if (!isValid) {
                    return res
                        .status(401)
                        .json({ error: "Invalid credentials!" });
                }
                // Create a new JWT with the user's information
                const payload = { id: user.id };
                const options = {
                    expiresIn: "2h",
                };
                const secret_key = "secret_key";

                const token = jwt.sign(payload, secret_key, options);

                // Store the JWT in the user's session
                user.password = undefined;
                res.cookie("token", token, {
                    httpOnly: true,
                    //secure: true, // only works on https
                });
                return res.status(200).json({ loggedIn: true, user });
            } catch (err) {
                // delete req.body.session.jwt;
                return res
                    .status(500)
                    .json({ error: "Internal server error" });
            }
        });
    } else {
        server.get("/data/login", async (req: Request, res: Response) => {
            // Extract the user's credentials from the request body

            const { email, password } = req.body;

            //! Check if JWT cookie exists
            if (req.cookies.token) {
                try {
                    const data = jwt.verify(req.cookies.token, "secret_key");

                    return res.status(200).json({ loggedIn: true, data });
                } catch (err) {
                    return res.status(401).json({ error: "Invalid token" });
                }
            } else {
                return res.status(401).json({ error: "No active session" });
            }
        });
    }
};

export const signOut = async function (server, db: any) {
    server.delete('/data/login', async (request, response)=>{
        response.clearCookie('token')
        response.status(200).json({loggedIn: false})
    })}

export default { signIn, signOut };
