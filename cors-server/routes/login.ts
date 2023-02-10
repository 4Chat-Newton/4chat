import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import {findUser, verifyJWT, validateUser, returnId} from "../controllers/authentication";

export const signIn = async function (server, db: any) {
    server.post("/data/login", async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try {
            const user = await findUser(email, db);
            const isValid = await validateUser(password, user.password);


            //TODO Test if jonatan is right or simon !!!
            // (!isValid && !user)
            // (!isValid || !user)
            if (!isValid && !user) {
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
            console.log("Backend token: ", token)

            return res.status(200).json({loggedIn: true, user_id: user.id, token: token});
        } catch (err) {
            // delete req.body.session.jwt;
            return res
                .status(500)
                .json({error: "Internal server error"});
        }
    });
};

export const signOut = async function (server, db: any) {
    server.delete('/data/login', verifyJWT, async (req, res) => {
        let result = {id: "", isLoggedIn: false, username: ""}
        result = returnId(req, res)
        if (result.isLoggedIn) {
            await db.prepare("UPDATE user SET online = 0 WHERE id = ?").run(result.id)
            res.clearCookie('token')
            res.status(200).json({message: `logged out`, loggedIn: false })
        } else {
            res.status(400).json({message: "Something went wrong!"})
        }
    })
}

export const getSignedInUser = async function (server, db: any) {
    server.get('/data/login', verifyJWT, async (req, res) => {
        let result = {
            id: "",
            isLoggedIn: false,
            username: ""
        }
        result = returnId(req, res)
        console.log(" result backend: ", result.id)
        return res.status(200).json({id: result.id, username: result.username, isLoggedIn: result.isLoggedIn})
    })
}
export default {signIn, signOut, getSignedInUser};