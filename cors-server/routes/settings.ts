import express from "express";
import {
    verifyJWT,
    updateUserName,
    returnUser,
    encryptPassword,
    updateUserPassword
} from "../controllers/authentication";

export const changeUserName = async function (server, db) {

    server.put("/data/settings/username", verifyJWT, async (req: express.Request, res: express.Response) => {
        const {id, username, password} = req.body;
        const encryptedPassword = await encryptPassword(password);
        let user = returnUser(req, res)
        const {name} = req.body;
        try {
            if (user.isLoggedIn) {
                await updateUserName(id, username, db)
                return res.status(200).json({msg: `Username changed ${username}`});
            } else {
                return res.status(401).json({error: "Invalid credentials!"});
            }

        } catch (e) {
            console.log("Error:", e)
        }
    });
}

export const changePassword = async function (server, db) {
    server.put("/data/settings/password", verifyJWT, async (req: express.Request, res: express.Response) => {
        const {id, username, password} = req.body;
        const encryptedPassword = await encryptPassword(password);
        let user = returnUser(req, res)
        const {name} = req.body;
        try {
            if (user.isLoggedIn) {
                await updateUserPassword(id, encryptedPassword, db)
                return res.status(200).json({msg: `Password changed ${encryptedPassword}`});
            } else {
                return res.status(401).json({error: "Invalid credentials!"});
            }
        } catch (e) {
            console.log("Error:", e)
        }
    });
}


