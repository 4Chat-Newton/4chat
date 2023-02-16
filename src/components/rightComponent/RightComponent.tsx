import { useState } from "react";
import socket from "../../socket";
import "./rightComponent.css";
import ChatTab from "./tabs/ChatTab";
import RoomTab from "./tabs/RoomTab";

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [users, setUsers] = useState<{self:boolean, username:string}>({
    self:false,
    username:''
  });

  const handleInbox = () => {
    setActiveTab("inbox");
  };

  const handleRoom = () => {
    setActiveTab("rooms");
  };

  socket.on("users", (_users) => {
    _users.forEach((user: { self: boolean; userID: string }) => {
      user.self = user.userID === socket.id;
    });
    // put the current user first, and then sort by username
    _users = _users.sort(
      (
        a: { self: any; username: number },
        b: { self: any; username: number }
      ) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }
    );
    setUsers(users);
  });

//   socket.on("user connected", (user) => {
//     setUsers(users = {...users,user})
//     // setUsers(...users.push(user))
//     // users.push(user);
//   });

  return (
    <>
      <section className="inbox">
        <ul className="inboxBtns">
          <li
            className={activeTab === "inbox" ? "active" : ""}
            onClick={handleInbox}
          >
            Joined
          </li>
          <li
            className={activeTab === "rooms" ? "active" : ""}
            onClick={handleRoom}
          >
            Browse
          </li>
        </ul>
        <div className="outlet">
          {activeTab === "inbox" ? <ChatTab users={users} /> : <RoomTab />}
        </div>
      </section>
    </>
  );
}
