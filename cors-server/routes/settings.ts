import express from "express";
import jwt from "jsonwebtoken";
import { findUser } from "../controllers/authentication";

module.exports = function (server, db) {
  server.get(
    "/data/settings/:password",
    async (req: express.Request, res: express.Response) => {
      try {
        const user = await db
          .prepare(" password FROM user WHERE password = @password")
          .get(req.params);
        res.json(user).status(200);
      } catch (e) {
        res.status(400).send({ message: "Password not found!" });
      }
    }
  );

  server.put(
    "/data/settings",
    async (req: express.Request, res: express.Response) => {
      //   const {username, email, password} = req.body;
      // const encryptedPassword = await encryptPassword(password);
      //TODO get online status from req body
      console.log("test");
      const { email, password } = req.body;
      try {
        const user = await findUser(email, db);

        if (!user) {
          return res.status(401).json({ error: "Invalid credentials!" });
        }

        if (req.cookies.token) {
          const data = jwt.verify(req.cookies.token, "secret_key");
          return res.status(200).json({ loggedIn: true, data });
        } else {
          console.error("no user!");
        }
      } catch (e) {}
      /*     try {
                res.status(400).send({message: "Username or Email already exist!"})
                await db.prepare("UPDATE user SET password = ? WHERE user_id = ?").run(newPass, user.id)
                res.status(200).send({message: "New user registered!"})
            } catch (e) {
            } */
    }
  );
};
/*Kolla user,
Kolla token,
 */
