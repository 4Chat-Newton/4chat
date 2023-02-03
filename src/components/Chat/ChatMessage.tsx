import { useState } from "react";
import "../style.css";

export default function ChatMessage({socket}:any) {

  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<any>([]);

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    console.log({ message });
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        // name: localStorage.getItem('userName'),//! ska kolla JWT token
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
