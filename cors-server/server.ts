import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { getSignedInUser, signIn, signOut } from "./routes/login";
import cookieparser from "cookie-parser";
import { createRoom, getRoom, deleteRoom, getAllRooms, joinRoom, leaveChatRoom, getAllJoinedRooms } from "./routes/room";

const port: Number = 8080;
const host: string = `http://localhost:${port}`;
export const app: any = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: ["http://localhost:3000"]
}));
app.use(cookieparser());

export const db = require("better-sqlite3")("./db/database.db");

app.get("/data", (req, res) => {
  res.send("NodeJS + Express + Typescript App Up! 👍");
});

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["POST", "GET"],
//   },
// });
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["POST", "GET"],
  },
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`${host}/data`);
});


io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }

  socket.onAny((event, ...args) => {
    console.log("SERVER:", event, args);
  });

  socket.username = username;
  next();
});


io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  // ...
});

io.on("connection", (socket) => {
  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
});





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
