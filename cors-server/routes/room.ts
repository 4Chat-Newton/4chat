import { requireSignin } from "../controllers/auth";
import express, { response, request } from 'express';

export const findRoom = async function (creatorId, db) {
  try {
    const result = await db
      .prepare(
        "SELECT name, creator_id FROM room WHERE name = ?"
      )
      .get();
    if (!result) {
      console.log(`No user found with creator_id ${creatorId}`);
      return result;
    }
    return result;
  } catch (error) {
    console.error(`No room found with selected creator_id ${creatorId}: ${error}`)
    return null;
  }
}

module.exports = async function (app, db) {
  app.post("/data/room", async (req: express.Request, res: express.Response) => {
    const validToken = requireSignin(req, res);
    console.log("validToken: ", validToken)
    const { creator_id, name } = req.body;
    if (validToken) {
      try {
        const room = await db.prepare("INSERT INTO room (creator_id, name) VALUES(?,?)").run(creator_id, name);
        return res.status(200).send(room)
      } catch (error) {
        return res
          .status(400)
          .json({ error: "Failed to get room" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid Credentials!" });
    }
  })

  app.get("/data/room", async (req: express.Request, res: express.Response) => {
    const result = await db
      .prepare(
        "SELECT name, creator_id FROM room WHERE name = ?"
      )
      .get(req.body.name);
    return res.status(200).send(result)
  })

  app.delete("/data/room", async (req: express.Request, res: express.Response) => {
    const result = await db
      .prepare(
        "DELETE FROM room WHERE creator_id = ?"
      )
      .run(req.body.creator_id);
    return res.status(200).send(result)
  })
}