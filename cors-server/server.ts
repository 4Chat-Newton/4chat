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

  socket.onAny((event, ...args) => {
    console.log("SERVER: ", event, args);
  });

  console.log(`user connected: ${socket.id} `);



  //Listens and logs the message to the console
  socket.on('message', (data) => {
    if (data.room=== null || data.room === "") {
      return io.emit('messageResponse', data);
    }

    let socketRoom = io.sockets.adapter.rooms

    console.log("SOCKETSET: ", socketRoom)

    io.to(data.room).emit('messageResponse', data)
  });

  socket.on('join_room', async ({ room }) => {
    await socket.join(room)
  })

  // On the server-side
  socket.on("getRoomSockets", (roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName);
    if (room) {
      const roomSet: Set<string> = room;
      roomSet.forEach((socketId) => {
        console.log(`Socket ${socketId} is joined to room ${roomName}`);
      });
    }
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
