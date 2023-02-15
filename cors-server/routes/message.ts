import express from "express";
import {encryptPassword, findUser, returnUser, validateUser, verifyJWT} from "../controllers/authentication";

export const storeMessage = async (server, db) => {

    server.post("/data/message", verifyJWT, async (req: express.Request, res: express.Response) => {
        let user = returnUser(req, res);
        const {sender_id, receiver_id, room, message, timestamp} = req.body;
        console.log("user.id: ",user.id, "receiver_id: ", receiver_id, "room: ", room,"message: ", message)

        try {
            await db.prepare("INSERT INTO message (sender_id, receiver_id, room, message) VALUES(?,?,?,?)")
                .run(user.id, receiver_id, room, message);
            return res.status(200).json({msg: "Stored message successfully!"})
        } catch (e) {
            return res
                .status(400)
                .json({error: "Failed to store message"});
        }

    })

}

