import express from 'express';
import * as https from "https";

module.exports = function (server, db){

    server.get('/data/register', (req, res) => {

        db.all("SELECT * FROM user", (err, rows) => {
            if (err) {
                // console.log(err);
            } else {
                res.send(rows);
                // console.log(rows);
            }
        })
    })

    server.post('/data/register', (request: express.Request, response: express.Response) => {
        const {username, email, password} = request.body;
        const statment = 'INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)';
        try {
            db.all(statment, [username, email, password, true], (err, rows) => {
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