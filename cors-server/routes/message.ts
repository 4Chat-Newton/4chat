import express from "express";
import {returnUser, verifyJWT} from "../controllers/authentication";

export const msgIdExist = async function (id, db) {
    try {
        const result = await db
            .prepare(
                "SELECT id from message WHERE id = ?"
            )
            .get(id);
        console.log(id)

        if (!result) {
            console.log(`No message found with the following id: ${id}`);
            return false;
        }
        return result;
    } catch (error) {
        console.log(`Couldn't find message with existing id. Error: ${error}`)
        return false;
    }
}

export const storeMessage = async (server, db) => {
    server.post("/data/message", verifyJWT, async (req: express.Request, res: express.Response) => {
        let user = returnUser(req, res);
        let {receiver_id, username, room_name, room, message, timestamp, deleted, reported, edited_message, socket_id} = req.body;

        try {
            await db.prepare("INSERT INTO message (sender_id, receiver_id, room, message, timestamp, deleted, reported, edited_message, socket_id, username, room_name) VALUES(?,?,?, ?, ?, ?, ?, ?, ?, ?, ?)")
                .run(user.id, receiver_id, room, message, timestamp, deleted, reported, edited_message, socket_id, username, room_name);
            return res.status(200).json({message: "Stored message successfully!"})
        } catch (e) {
            return res
                .status(400)
                .json({message: "Failed to store message", error: e});
        }
    })
}

export const getMsgFromRoom = async (server, db) => {
    server.get("/data/message/room-messages/:roomId", verifyJWT, async (req: express.Request, res: express.Response) => {
        const {receiver_id} = req.body;

        try {
            const room = await db.prepare("SELECT * FROM message WHERE receiver_id = @roomId AND deleted = false ORDER BY id").all(req.params);
            return res.json(room).status(200)

        } catch (e) {
            return res.status(400).send({message: "Failed to execute.", error: e})
        }

    });
}

export const getJoinedRoomMessanges = async (server, db) => {
    server.get("/data/message/user-messages", verifyJWT, async (req: express.Request, res: express.Response) => {
        let user = returnUser(req, res);
        const {receiver_id} = req.body;
        try {
            const room = await db.prepare("SELECT msg.id, msg.sender_id, msg.receiver_id, msg.username, msg.room_name, msg.room, msg.message, msg.timestamp, msg.deleted, msg.reported, msg.edited_message, msg.socket_id FROM message msg INNER JOIN joined_room jr on jr.room_id = msg.receiver_id WHERE jr.user_id = ? AND msg.deleted = false ORDER BY msg.id;").all(user.id);
            return res.json(room).status(200)

        } catch (e) {
            return res.status(400).send({message: "Failed to execute.", error: e})
        }
    });
}