import express from "express";
import sqlite from "sqlite3";
import {useCallback} from "react";
export const server:any = express();
const port:Number = 8080;
export const db =  new sqlite.Database('database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.')
});

server.use(express.json());
server.use(express.urlencoded())

server.get('/', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


server.get('/register', (req, res) => {

    db.all("SELECT * FROM user", (err, rows) => {
        if (err) {
            // console.log(err);
        } else {
            res.send(rows);
            // console.log(rows);
        }
    })
})
server.post('/register', (request: express.Request, response: express.Response) => { // express.Request
    const { username, email, password, online } = request.body;
    console.log(request.body)
    console.log(username, email, password, online)
    const query = 'INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)';
    db.run(query, [username, email, password, online]);
    response.json({ userCreated: true });
});

