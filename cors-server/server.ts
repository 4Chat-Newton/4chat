import express from "express";
import { Server } from "socket.io"
import cors from "cors";
import { signIn, signOut} from "./routes/authentication";
import cookieparser from "cookie-parser";


const port: Number = 8080;
const host: string = `http://localhost:${port}`;
export const server: any = express();
server.use(express.json());
server.use(express.urlencoded())
server.use(cors())
server.use(cookieparser())

export const db = require('better-sqlite3')('./db/database.db');

server.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

const app = server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`${host}/data`);
});

const io = new Server(3000)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



require("./routes/register")(server, db)

signIn(server, db, true)
signIn(server, db, false)
signOut(server, db)
