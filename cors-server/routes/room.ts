import { Room } from "./../../src/Types/Room";
import { User } from "./../../src/Types/User";
import requireSignin from "../validators/auth";
import express from 'express';
import jwt from "jsonwebtoken";


module.exports = function (server, db, validToken : boolean) {
  if (validToken) {
    server.put("/room", async (req: express.Request, res: express.Response) => {
      const {creatorId, roomName} = req.body;
      try {
        const user = await roomName(creatorId, db)
        if (!validToken) {
          return res
            .status(401)
            .json({ error: "Invalid credentials!" });
        }
      } catch (error) {
        
      }
    })
  }
}



export const roomName = async function (creatorId, db) {
  try {
    const result = db
    .prepare(
      "SELECT name FROM room WHERE creator_id = ?"
    )
    .get(creatorId);

    if (!result) {
      console.log(`No user found with email ${creatorId}`);
      return result;
  }
  return result;
  } catch (error) {
    console.error(`No room found with selected creator_id ${creatorId}: ${error}`)
    return null;
  }
}
//skapa en endpoint /room 

// function checkJWTCookie() :string {
//   console.log(document.cookie);
//   return document.cookie;
// }

// function userDetails() {
//   const token = checkJWTCookie();
//   if (checkJWTCookie() !== "") {
//     window.location.href = "/login";
//   }
  
//   try {
//     const decoded = jwt.verify(token, "secret");
//     console.log(decoded);
//   } catch (error) {
//     console.error(error);
//   }
// }



// import express from 'express';
// import http from 'http';
// import WebSocket from 'ws';
// import { v4 as uuidv4 } from 'uuid';

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// interface Message {
//   sessionId: string;
//   sender: string;
//   text: string;
// }

// wss.on('connection', (ws) => {
//   const sessionId = uuidv4();
//   ws.on('message', (message: string) => {
//     const data: Message = JSON.parse(message);
//     data.sessionId = sessionId;
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(data));
//       }
//     });
//   });
// });

// server.listen(8080, () => {
//   console.log(`Server started on port 8080`);
// });



//   class ChatRoom {

//     chatRoom = new Room("simon", User["sanjin"], User["Barkat"])

//   }
// }



    // chatRoom =  new Room(name, bannedUsers, users, moderators, creator, log, reports);
    




/* interface ChatRoom {
    name: string;
    creatorId: number;
  }
  
  class ChatRoomManager {
    private chatRooms: ChatRoom[] = [];
    ChatRoom = await db.prepare("GET user (user").get(1);
  
    createChatRoom(name: string, creatorId: number) {
      const newChatRoom: ChatRoom = { name, creatorId };
      this.chatRooms.push(newChatRoom);
    }
  }
  
  const chatRoomManager = new ChatRoomManager();
  
  const userId = 'abc123';
  chatRoomManager.createChatRoom('Room 1', 2); */