import express from "express";
import {
    verifyJWT,
    updateUserName,
    returnUser,
    encryptPassword,
    updateUserPassword, updateEmail, findUser, deleteUser, validateUser
} from "../controllers/authentication";

export const changeUserName = async function (server, db) {
    server.put("/data/settings/username", verifyJWT, async (req: express.Request, res: express.Response) => {
        const {id, username} = req.body;
        let user = returnUser(req, res)
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

export const changeEmail = async function (server, db){
    server.put("/data/settings/email", verifyJWT, async (req: express.Request, res: express.Response) => {
        const {id, email} = req.body;
        let user = returnUser(req, res)
        try{
            if(user.isLoggedIn){
                await updateEmail(id, email, db)
                return res.status(200).json({msg: `Email changed ${email}`});
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
        const {id , password} = req.body;
        const encryptedPassword = await encryptPassword(password);
        let user = returnUser(req, res)
        try {
            if (user.isLoggedIn) {
                await updateUserPassword(id, encryptedPassword)
                return res.status(200).json({msg: `Password changed ${encryptedPassword}`});
            } else {
                return res.status(401).json({error: "Invalid credentials!"});
            }
        } catch (e) {
            console.log("Error:", e)
        }
    });
}

export const deleteAccount = async function (server, db) {
    server.delete("/data/settings/delete", verifyJWT, async (req: express.Request, res: express.Response) => {
        const { username, password } = req.body;
        let user = returnUser(req, res)
        const data = await db.prepare("SELECT password, id FROM user WHERE id = ?").get(user.id)
        if(await validateUser(password, data.password)){
            try {
                if (!user.isLoggedIn) {
                    return res.status(401).send({error: "Unauthorized"});
                }
                if (!findUser) {
                    return res.status(401).send({error: "User not found"});
                }
                const result = await deleteUser(user.id, db)
                if(result){
                    return res.status(200).send({message: `User '${username}' has been deleted`});
                }else{
                    return res.status(400).send("Failed to delete user")
                }
            } catch (error) {
                return res.status(500).send({error: "Internal Server Error"});
            }
        }else{
            return res.status(403).send("password didnt match!")
        }
    });
};
