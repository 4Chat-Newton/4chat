import {useContext, useState} from "react";
import "../style.css";
import Setup from "../commandHandler/Setup";
import StoreMessage from "../controller/Controller";
// import activeRoomContext from "../../ActiveRoomContext";


export default function ChatMessage({socket}:any) {

  const [message, setMessage] = useState('');
    // const { activeRoom } = useContext(activeRoomContext);
    const activeRoomId = ""

  let date = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const handleSendMessage = (e:any) => {
      let userId = localStorage.getItem('user_id')
    e.preventDefault();

    if (message.trim()) {
      socket.emit('message', {
        text: message,
        user: localStorage.getItem('username'),//! ska kolla JWT token
        timeStamp: date,
        id: `${socket.id}${Math.random()}`, // Room_id ?
        socketID: socket.id,
      });
        StoreMessage(userId, activeRoomId, message, date)
    }
    setMessage('');
  };

    const handleInput = async () => {
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