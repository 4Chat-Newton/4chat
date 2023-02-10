import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import {findUser, requireSignin, validateUser} from "../controllers/authentication";
import {ok} from "assert";

// export const signIn = async function (server, db: any) {
//
//     const isLoggedIn = db.prepare("SELECT online FROM user WHERE id = ?")
//
//     if (!isLoggedIn) {
//         server.post("/data/login", async (req: Request, res: Response) => {
//             // Extract the user's credentials from the request body
//             const { email, password } = req.body;
//             // Verify the user's credentials against the database
//             try {
//                 const user = await findUser(email, db);
//
//                 if (!user) {
//                     return res
//                         .status(401)
//                         .json({ error: "Invalid credentials!" });
//                 }
//
//                 const isValid = await validateUser(password, user.password);
//
//                 if (!isValid) {
//                     return res
//                         .status(401)
//                         .json({ error: "Invalid credentials!" });
//                 }
//                 // Create a new JWT with the user's information
//                 const payload = { id: user.id };
//                 const options = {
//                     expiresIn: "2h",
//                 };
//                 const secret_key = "secret_key";
//
//                 const token = jwt.sign(payload, secret_key, options);
//
//                 // Store the JWT in the user's session
//                 user.password = undefined;
//                 res.cookie("token", token, {
//                     httpOnly: true,
//                     //secure: true, // only works on https
//                 });
//
//                 await db.prepare("UPDATE user SET online = 1 WHERE id = ?").run(user.id)
//                 // isLoggedIn = true
//
//                 return res.status(200).json({ loggedIn: true, user });
//             } catch (err) {
//                 // delete req.body.session.jwt;
//                 return res
//                     .status(500)
//                     .json({ error: "Internal server error" });
//             }
//         });
//     } else {
//         server.get("/data/login", async (req: Request, res: Response) => {
//             // Extract the user's credentials from the request body
//
//             // const { email, password } = req.body;
//
//             console.log("req.body: ", req.body)
//             //TODO check token this
//             const isLoggedIn = requireSignin(req, res)
//             console.log("isLoggedIn: ", isLoggedIn.status)
//             console.log("isLoggedIn: ", isLoggedIn.id)
//             console.log("req.cookies.token: ", req.cookies.token)
//             //! Check if JWT cookie exists
//             if (req.cookies.token) {
//                 try {
//                     const data = jwt.verify(req.cookies.token, "secret_key");
//
//                     return res.status(200).json({ loggedIn: true, data });
//                 } catch (err) {
//                     return res.status(401).json({ error: "Invalid token" });
//                 }
//             } else {
//                 return res.status(401).json({ error: "No active session" });
//             }
//         });
//     }
// };

// export const signOut = async function (server, db: any) {
//     server.delete('/data/login', async (request, response) => {
//         const isLoggedIn = requireSignin(request, response)
//
//         if (isLoggedIn.status) {
//             await db.prepare("UPDATE user SET online = 0 WHERE id = ?").run(isLoggedIn.id)
//             response.clearCookie('token')
//             response.status(200).json({message: `${isLoggedIn.id} is logged out`, loggedIn: false})
//         } else {
//             response.status(400).json({message: "Something went wrong!"})
//         }
//     })
// }

export const signOut = async function (server, db: any) {
    server.delete('/data/login', async (request, response) => {
            response.clearCookie('token')
            response.status(200).json({message: `logged out`, loggedIn: false})
    })
}
// export const getSignInUser = async function (server, db: any) {
//     let isLoggedIn = {
//         id: "",
//         status: false
//     }
//     server.get('/data/login', async (req, res) => {
//         isLoggedIn = requireSignin(req, res)
//         console.log("isLoggedIn: ", isLoggedIn.status, " id:", isLoggedIn.id)
//         if (isLoggedIn.status) {
//             return res.status(200).json({message: `User ${isLoggedIn.id} is logged in`, loggedIn: true})
//             // return res.status(200).send(`User ${isLoggedIn.id} is logged in`)
//         } else {
//             return res.status(400).json({message: `User is not logged in`, loggedIn: false})
//         }
//     })
// }

export const getSignInUser = async function (server, db: any) {

    server.get('/data/login', requireSignin, async (req, res) => {
            return res.send("Get sign in user")
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
export default {signIn, signOut, getSignInUser};