import express from "express";
import { Server } from "socket.io"
import cors from "cors";
import http from "http"
import { signIn, signOut} from "./routes/authentication";
import cookieparser from "cookie-parser";


const port: Number = 8080;
const host: string = `http://localhost:${port}`;
export const app: any = express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())
app.use(cookieparser())

export const db = require('better-sqlite3')('./db/database.db');

app.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

const server = http.createServer(app) 

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"],
    },
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`${host}/data`);
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
        socket.emit("receive_message", data)
        //console.log(data)
    })
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });



require("./routes/register")(app, db)

signIn(app, db, true)
signIn(app, db, false)
signOut(app, db)
