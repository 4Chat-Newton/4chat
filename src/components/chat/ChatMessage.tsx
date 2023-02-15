import { useState } from "react";
import "../style.css";
import Setup from "../commandHandler/Setup";
import activeRoomContext from "../../ActiveRoomContext";
import {useContext} from "react";

export default function ChatMessage({socket}:any) {
  const { botMessage } = useContext(activeRoomContext);
  const [message, setMessage] = useState('');

  let date = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    console.log({ message });
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        user: localStorage.getItem('username'),//! ska kolla JWT token
        timeStamp: date,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

    const handleInput = async () => {
    console.log("BOT: ", botMessage)
        socket.emit('message', {
                text: botMessage,
                user: "BOT",
                timeStamp: date,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
              });
        Setup(message)
    }

  return (
        <form className="msg" onSubmit={handleSendMessage}>
        <input
          style={{color:"lightgreen"}}
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send" onClick={handleInput}>
          Send
        </button>
        </form>
  );
}