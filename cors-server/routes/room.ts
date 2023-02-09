import { requireSignin } from "../controllers/authentication";
import express, { response, request } from 'express';
import { stat } from "fs";

export const findExistingRoom = async function (name, db) {
    try {
        const result = await db
            .prepare(
                "SELECT name FROM room WHERE name = ?"
            )
            .get(name);

        if (!result) {
            console.log(`No room found with the following name: ${name}`);
            return null;
        }
        return result;
    } catch (error) {
        console.error(`${error}`)
        return null;
    }
}

export const createRoom = async function (server, db) {
  server.post("/data/room", async (req: express.Request, res: express.Response) => {
    const { id, status } = requireSignin(req, res);
    const { name } = req.body;
    const existingRoom = await findExistingRoom(name, db)

        if (status) {
            try {

                if (!existingRoom) {

          await db.prepare("INSERT INTO room (creator_id, name) VALUES(?,?)").run(id, name);
          return res.status(200).json({ msg: "Room created" })
        } else {
          return res.status(400).json({ error: `Room "${name}" already exists!` })
        }
      } catch (e) {
        return res
          .status(400)
          .json({ error: "Failed to create room" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid Credentials!" });
    }
  })
}

export const getAllRooms = async function (server, db) {
  server.get("/data/room", async (req: express.Request, res: express.Response) => {
    try {
      const result = await db
        .prepare(
          "SELECT * FROM room"
        )
        .all();
      return res.status(200).send(result)
    } catch (e) {
      return res.status(400).send("Failed to retrieve rooms!")
    }
  })
}

export const joinRoom = async function (server, db) {
  server.post("/data/room/join", async (req: express.Request, res: express.Response) => {
    const { id, status } = requireSignin(req, res);
    const { room_id } = req.body;
    const roomCheck = await db.prepare("SELECT * FROM joined_room WHERE user_id = ? AND room_id = ?").get(id, room_id);
    
    if (status && roomCheck == undefined) {
      try {
          await db.prepare("INSERT INTO joined_room (user_id, room_id) VALUES(?,?)").run(id, room_id);
          return res.status(200).json({ msg: "Room joined" })
      } catch (e) {
        return res
          .status(400)
          .json({ error: "Failed to join room" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Room already joined !" });
    }
  })
}

export const deleteRoom = async function (server, db) {
  server.delete("/data/room", async (req: express.Request, res: express.Response) => {

    const existingRoom = await findExistingRoom(req.body.name, db)
    if (!existingRoom) {
      return res.status(400).send(`Room '${req.body.name}' doesn't exist!`)
    } else {
      try {
        await db.prepare("DELETE FROM room WHERE name = ?").run(req.body.name);
        return res.status(200).send(`Room '${req.body.name}' has been deleted!`)
      } catch (e) {
        return res.status(400).send(`Failed to delete room '${req.body.name}'!`)
      }
    }
  })
}

export const leaveChatRoom =async (server ,db) => {
  server.delete("/data/room/leave", async (req: express.Request, res: express.Response) => {
    const { id, status } = requireSignin(req, res);
    const { room_id } = req.body;
    const roomCheck = await db.prepare("SELECT * FROM joined_room WHERE user_id = ? AND room_id = ?").get(id, room_id);

    if (roomCheck == undefined) {
      return res.status(400).send(`Room'${req.body.room_id}' doesn't exist!`)
    } else {
      try {
        await db.prepare("DELETE FROM joined_room WHERE room_id = ? ").run(req.body.room_id);
        return res.status(200).send(`Room '${req.body.room_id}' has been left!`)
      } catch (e) {
        return res.status(400).send(`Failed to leave room '${req.body.room_id}'!`)
      }
    }
  })
}

