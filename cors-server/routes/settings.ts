import express from "express";
import jwt from "jsonwebtoken";
import { updateUserName, encryptPassword } from "../controllers/authentication";

module.exports = function (server, db) {

  server.put("/data/settings", async (req: express.Request, res: express.Response) => {
  
      //TODO get online status from req body
      const { id, username, email, password } = req.body;
      const encryptedPassword = await encryptPassword(password);
      try {
        console.log("username, id:", username, " : ", id)
       const user = await updateUserName(id, username, db);

        if (req.cookies.token) {
          const data = jwt.verify(req.cookies.token, "secret_key");
          return res.status(200).json({ loggedIn: true, data });
        } else {
          console.error("Invalid token");
        }

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials!" });
          }
      } catch (e) {
        console.log("Error:", e)
      }
    }
  );
};

