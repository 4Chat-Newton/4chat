import { useContext, useState } from "react";
import "../style.css";
import Setup from "../commandHandler/Setup";
import activeRoomContext from "../../ActiveRoomContext";


export default function ChatMessage({socket}:any) {

  const [message, setMessage] = useState('');
  const { activeRoom } = useContext(activeRoomContext);

  let date = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    console.log({ message });
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        user: localStorage.getItem('username'),
        timeStamp: date,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: activeRoom
      });
    }
    setMessage('');
  };

    const handleInput = async () => {
        //TODO remove console.log
        console.log("handleInput data:", message)
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