import express from 'express';
import {encryptPassword, validateUser, findUser} from '../controllers/authentication';

module.exports = function (server, db) {

    server.get("/data/register/:username", async (req: express.Request, res: express.Response) => {
        try {
            const user = await db.prepare("SELECT * FROM user WHERE username = @username").get(req.params);
            res.json(user).status(200)
        } catch (e) {
            res.status(400).send({message: "Users not found!"})
        }
    });

    server.post("/data/register", async (req: express.Request, res: express.Response) => {
        const {username, email, password} = req.body;
        const encryptedPassword = await encryptPassword(password);
        //TODO get online status from req body
        try {
            await db.prepare("INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)").run(username, email, encryptedPassword, 1);
            res.status(200).send({message: "New user registered!"})
        } catch (e) {
            res.status(400).send({message: "Username or Email already exist!"})
        }
    });

    server.delete("/data/register", async (req: express.Request, res: express.Response) => {
        const {email, password} = req.body;

        try {
            const user = await findUser(email, db);

            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Invalid credentials!" });
            }

            const isValid = await validateUser(password, user.password);

            if (!isValid) {
                return res
                    .status(401)
                    .json({error: "Invalid credentials!"});
            }

            try {
                await db.prepare("DELETE FROM user WHERE email = ?").run(email)

            }catch(e) {
                console.log("Error: ", e)
            }


            return res.status(200).send({message: "User deleted!" });
        } catch (err) {
            console.log("Error:", err)
            return res
                .status(500)
                .json({ error: "Internal server error" });
        }
    });

    server.delete("/data/register/:username", async (req: express.Request, res: express.Response) => {

        try {
            await db.prepare("DELETE FROM user WHERE username = @username").run(req.params)
            return res.status(200).send({message: "User Deleted!"})
        }catch(e) {
            console.log("Error: ", e)
            return res.status(400).send({message: "User Not Deleted!"})
        }
    });
}