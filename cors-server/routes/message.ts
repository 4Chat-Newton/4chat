import express from "express";
import {encryptPassword, findUser, returnUser, validateUser, verifyJWT} from "../controllers/authentication";
import {findExistingRoom} from "./room";

export const storeMessage = async (server, db) => {
    server.post("/data/message", verifyJWT, async (req: express.Request, res: express.Response) => {
        let user = returnUser(req, res);
        let {receiver_id, room, message, timestamp, deleted, reported, edited_message, socket_id} = req.body;

        try {
            await db.prepare("INSERT INTO message (sender_id, receiver_id, room, message, timestamp, deleted, reported, edited_message, socket_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)")
                .run(user.id, receiver_id, room, message, timestamp, deleted, reported, edited_message, socket_id);
            return res.status(200).json({message: "Stored message successfully!"})
        } catch (e) {
            return res
                .status(400)
                .json({message: "Failed to store message", error: e});
        }
    })
}

export const getMsgFromRoom = async (server, db) => {
    server.get("/data/message/room-messages", verifyJWT, async (req: express.Request, res: express.Response) => {
        const { receiver_id } = req.body;
        try {
            // if (!msgIdExist) {
                const room = await db.prepare("SELECT * FROM message WHERE receiver_id = ?").all(receiver_id);
                return res.json(room).status(200)
            // } else {
            //     return res.status(400).send({message: "Room id not found!"})
            // }
        } catch (e) {
            return res.status(400).send({message: "Failed to execute.", error: e})
        }
    });
}

export const getJoinedRoomMessanges = async (server, db) => {
    server.get("/data/message/user-messages", verifyJWT, async (req: express.Request, res: express.Response) => {
        let user = returnUser(req, res);
        const { receiver_id } = req.body;
        try {
            // if (!msgIdExist) {
            const room = await db.prepare("SELECT msg.id, msg.sender_id, msg.receiver_id, msg.room, msg.message, msg.timestamp, msg.deleted, msg.reported, msg.edited_message, msg.socket_id FROM message msg INNER JOIN joined_room jr on jr.room_id = msg.receiver_id WHERE jr.user_id = ?;").all(user.id);
            return res.json(room).status(200)
            // } else {
            //     return res.status(400).send({message: "Room id not found!"})
            // }
        } catch (e) {
            return res.status(400).send({message: "Failed to execute.", error: e})
        }
    });
}