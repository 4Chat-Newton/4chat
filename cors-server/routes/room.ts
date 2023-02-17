import { returnUser, verifyJWT } from "../controllers/authentication";
import express, { response, request } from 'express';

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
    console.log(`Couldn't find existing room. Error: ${error}`)
    return null;
  }
}

export const getRoom = async function (server, db) {
  server.get("/data/room/:name", async (req: express.Request, res: express.Response) => {
    const roomExist = findExistingRoom(req.params, db)
    if (roomExist !== null) {
      try {
        const room = await db.prepare("SELECT * FROM room WHERE name = @name").get(req.params);
        res.json(room).status(200)
      } catch (e) {
        res.status(400).send({ message: "Room not found!" })
      }
    } else {
      res.status(400).send({ message: "Room not found!" })
    }
  });
}


export const createRoom = async function (server, db) {
  server.post("/data/room", verifyJWT, async (req: express.Request, res: express.Response) => {
    let result = { id: "", isLoggedIn: false, username: "" }
    result = returnUser(req, res)
    const { name } = req.body;
    const existingRoom = await findExistingRoom(name, db)
    console.log(result.isLoggedIn)
    if (result.isLoggedIn) {
      try {

        if (!existingRoom) {
          await db.prepare("INSERT INTO room (creator_id, name) VALUES(?,?)").run(result.id, name);
          const room = await db.prepare(`SELECT * FROM room WHERE name = '${name}'`).get();
          const roomUrl = `/data/room/${room.name}`;
          return res.status(200).json({msg: `Room created`, roomUrl})
        } else {
          return res.status(400).json({error: `Room "${name}" already exists!`})
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
    let user = returnUser(req, res);
    try {
      const result = await db
          .prepare(
              "SELECT room.id AS id, room.creator_id, room.name FROM room LEFT JOIN joined_room ON room.id = joined_room.room_id AND joined_room.user_id = ? WHERE joined_room.id IS NULL"
          )
          .all(user.id);

      return res.status(200).send(result)
    } catch (e) {
      return res.status(400).send("Failed to retrieve rooms!")
    }
  })
}

export const getAllJoinedRooms = async function (server, db) {
  server.get("/data/room/joined", async (req: express.Request, res: express.Response) => {
    let user = returnUser(req, res);
    try {
      const result = await db
        .prepare(
          "SELECT * FROM room JOIN joined_room jr on room.id = jr.room_id WHERE jr.user_id = ?").all(user.id);
      return res.status(200).send(result)
    } catch(e) {
      return res.status(400).send("Failed to retrieve rooms!")
    }
  })
}

export const joinRoom = async function (server, db) {
  server.post("/data/room/join", async (req: express.Request, res: express.Response) => {
    let user = returnUser(req, res);
    const { room_id } = req.body;
    const roomCheck = await db.prepare("SELECT * FROM joined_room WHERE user_id = ? AND room_id = ?").get(user.id, room_id);

    if (room_id !== undefined){
      if (user.isLoggedIn && roomCheck == undefined) {
        try {
          await db.prepare("INSERT INTO joined_room (user_id, room_id) VALUES(?,?)").run(user.id, room_id);
          return res.status(200).json({ msg: "Room joined" })
        } catch (e) {
          return res
              .status(400)
              .json({ error: "Failed to join room" });
        }
      } else {
        return res
            .status(400)
            .json({ error: "Room already joined!" });
      }
    } else {
      return res.status(400).json( {error: "Room id is undefined!"})
    }

  })
}

export const leaveChatRoom = async (server, db) => {
  server.delete("/data/room/leave", async (req: express.Request, res: express.Response) => {
    let result = {id: "", isLoggedIn: false, username: ""}
    result = returnUser(req, res)
    const { room_id } = req.body;
    const roomCheck = await db.prepare("SELECT * FROM joined_room WHERE user_id = ? AND room_id = ?").get(result.id, room_id);

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


export const deleteRoom = async function (server, db) {
  server.delete("/data/room",verifyJWT, async (req: express.Request, res: express.Response) => {
    try {
      const existingRoom = await findExistingRoom(req.body.name, db);
      let user = {id: "", isLoggedIn: false, username: "" }
      user = returnUser(req, res);
      const { name } = req.body;
      const { creator_id } = await checkCreatorId(user.id , db);

      if (!user.isLoggedIn) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      if (!existingRoom) {
        return res.status(400).send({ error: `Room '${name}' does not exist` });
      }

      if (!creator_id) {
        return res.status(400).send({ error: "Missing creator_id in the request body" });
      }

      if (user.id !== creator_id) {
        return res.status(403).send({ error: "Forbidden" });
      }

      await db.prepare("DELETE FROM room WHERE name = ?").run(name);
      return res.status(200).send({ message: `Room '${name}' has been deleted` });
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });
};

export const checkCreatorId = async (creator_id, db) => {
  try {
    const result = await db
      .prepare(
        "SELECT creator_id FROM room WHERE creator_id = ?"
      )
      .get(creator_id);
    if (!result) {
      console.log(`No room found with the following creator_id: ${creator_id}`);
      return null;
    }
    return result;
  } catch (error) {
    console.error(`${error}`)
    return null;
  }
}

export const getAllJoinedRoomNames = async function (server, db) {
  server.get("/data/room/joined/names", async (req: express.Request, res: express.Response) => {
    let user = returnUser(req, res);
    try {
      const result = await db
          .prepare(
              "SELECT name FROM room JOIN joined_room jr on room.id = jr.room_id WHERE jr.user_id = ?").all(user.id);
      return res.status(200).send(result)
    } catch(e) {
      return res.status(400).send("Failed to retrieve rooms!")
    }
  })
}