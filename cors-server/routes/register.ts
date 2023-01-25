import express from 'express';
import {encryptPassword, validateUser} from "./authentication";

module.exports = function (server, db){

    server.post('/data/register', async (request: express.Request, response: express.Response) => {
        const {username, email, password} = request.body;
        const encryptedPassword = await encryptPassword(password);
        const query = 'INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)'

        try {
            db.all(query, [username, email, encryptedPassword, true], (err, rows) => {
                if (!err) {
                    response.json({userCreated: true})
                } else {
                    response.status(400).json({error: "username or email already in use", userCreated: false});
                }
            });
        } catch (e) {
            console.log(e)
        }
    });
    
}
