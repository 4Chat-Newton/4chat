import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import {getSignedInUser, signIn, signOut} from "./routes/login";
import cookieparser from "cookie-parser";
import {createRoom, getRoom, deleteRoom, getAllRooms, joinRoom, leaveChatRoom, getAllJoinedRooms} from "./routes/room";
import {getJoinedRoomMessanges, getMsgFromRoom, storeMessage} from "./routes/message";
import path from 'path';
import { BASE_URL } from "./consts";
import {changeEmail, changePassword, changeUserName, deleteAccount} from "./routes/settings";

const port: Number = 8080;
const host: string = `http://localhost:${port}`;
export const app: any = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: [`${BASE_URL}`]
}));
app.use(cookieparser());

export const db = require("better-sqlite3")("./db/database.db");


app.get("/data", (req, res) => {
  res.send("NodeJS + Express + Typescript App Up! 👍");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${BASE_URL}`,
    methods: ["POST", "GET"],
  },
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`${host}/data`);
});

io.on('connection', (socket)=>{
  console.log(`user connected: ${socket.id} `);

  //Listens and logs the message to the console
  socket.on('message', (data) => {
    console.log(data);
    io.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id} `);
  });
})

require("./routes/register")(app, db);

signIn(app, db);
signOut(app, db);
getSignedInUser(app, db)
getAllJoinedRooms(app, db)
createRoom(app, db)
getAllRooms(app, db)
deleteRoom(app, db)
joinRoom(app, db)
getRoom(app, db)
leaveChatRoom(app, db)
changeUserName(app,db)
changePassword(app,db)
changeEmail(app,db)
deleteAccount(app,db)
storeMessage(app, db)
getMsgFromRoom(app, db)
getJoinedRoomMessanges(app, db)

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))

})

