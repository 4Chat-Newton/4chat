import express from "express";
import sqlite from "sqlite3";
import {signIn, registerUser} from "./routes/authentication";

const port: Number = 8080;
export const server: any = express();
server.use(express.json());
server.use(express.urlencoded())
export const db = new sqlite.Database('./db/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.')
});

server.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}/data`);
});

// require("./routes/register")(server, db)
registerUser(server, db)
signIn(server, db, true)
// signIn(server, db, false)
