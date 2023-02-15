import express from "express";
import {encryptPassword, findUser, returnUser, validateUser, verifyJWT} from "../controllers/authentication";

export const storeMessage = async (server, db) => {

    server.post("/data/message", verifyJWT, async (req: express.Request, res: express.Response) => {
        let user = returnUser(req, res);
        let  {sender_id, receiver_id, room, message, timestamp} = req.body;
        try {

            const result = await db.prepare("INSERT INTO message (sender_id, receiver_id, room, message, timestamp) VALUES(?, ?, ?, ?, ?)")
                .run(user.id, receiver_id, room, message, timestamp);
            console.log("result: ", result)
            return res.status(200).json({message: "Stored message successfully!"})
        } catch (e) {
            return res
                .status(400)
                .json({message : "Failed to store message", error: e});
        }

    })

}

