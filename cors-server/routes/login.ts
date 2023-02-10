import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import {findUser, requireSignin, validateUser} from "../controllers/authentication";
import {ok} from "assert";

export const signOut = async function (server, db: any) {
    server.delete('/data/login', async (request, response) => {
            response.clearCookie('token')
            response.status(200).json({message: `logged out`, loggedIn: false})
    })
}

export const getSignInUser = async function (server, db: any) {

    server.get('/data/login', requireSignin , async (req, res) => {
            return res.status(200).send("Get sign in user")
    })
}

export const signIn = async function (server, db: any) {
    server.post("/data/login", async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try {
            const user = await findUser(email, db);

            if (!user) {
                return res
                    .status(401)
                    .json({error: "Invalid credentials!"});
            }

            const isValid = await validateUser(password, user.password);

            if (!isValid) {
                return res
                    .status(401)
                    .json({error: "Invalid credentials!"});
            }

            // Create a new JWT with the user's information
            const payload = {id: user.id, username: user.username};
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


            await db.prepare("UPDATE user SET online = 1 WHERE id = ?").run(user.id)
            // isLoggedIn = true

            console.log("user_id: ", user.id)
            console.log("token: ", token)
            // setJwt(token)
            return res.status(200).json({loggedIn: true, user_id: user.id, token: token});
        } catch (err) {
            // delete req.body.session.jwt;
            return res
                .status(500)
                .json({error: "Internal server error"});
        }
    });
};
export default {signIn, signOut, getSignInUser};