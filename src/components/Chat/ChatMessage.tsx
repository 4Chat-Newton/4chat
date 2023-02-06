import { useState } from "react";
import "../style.css";

export default function ChatMessage({socket}:any) {
  
  const [message, setMessage] = useState('');

  let date = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    console.log({ message });
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        user: 'signedInUser',//! ska kolla JWT token
        timeStamp: date,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  
  return (
        <form className="msg" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send">
          Send
        </button>
        </form>
  );
}
