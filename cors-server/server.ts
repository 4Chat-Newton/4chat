import express from "express";
import cors from "cors";
import { signIn } from "./routes/authentication";

const port: Number = 8080;
const host: string = `http://localhost:${port}`;

const server: any = express();
server.use(express.json());
server.use(express.urlencoded())
server.use(cors())

export const db = require('better-sqlite3')('./db/database.db');

server.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`${host}/data`);
});

require("./routes/register")(server, db)

signIn(server, db, true)

