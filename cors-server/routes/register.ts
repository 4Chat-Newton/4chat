import express from 'express';
import {encryptPassword, validateUser} from './authentication';

module.exports = function (server, db){

    server.post("/data/register", async (req: express.Request, res: express.Response) => {
            const {username, email, password} = req.body;
            const encryptedPassword = await encryptPassword(password);
            try {
                await db.prepare("INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)").run(username, email, encryptedPassword, 1);
                res.send({message: "New user registered!"})
            } catch (e) {
                res.status(400).send({message: "Username or Email already exist!"})
            }
        }
    );
    
}
