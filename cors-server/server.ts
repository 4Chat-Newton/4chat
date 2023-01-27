import express from "express";
import { signIn } from "./routes/authentication";

const port: Number = 8080;
export const server: any = express();
server.use(express.json());
server.use(express.urlencoded())


export const db = require('better-sqlite3')('./db/database.db');

server.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}/data`);
});

require("./routes/register")(server, db)
signIn(server, db, true)
