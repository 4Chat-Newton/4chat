import express from "express";
import { Server } from "socket.io"
import cors from "cors";
import http from "http"
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

const server1 = http.createServer(server) 

const io = new Server(server1, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"],
    },
});

server1.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`${host}/data`);
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });



require("./routes/register")(server, db)

signIn(server, db, true)
signIn(server, db, false)
signOut(server, db)
