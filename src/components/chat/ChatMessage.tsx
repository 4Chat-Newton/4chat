import { useState } from "react";
import Setup from "../commandHandler/Setup";
import "../style.css";

export default function ChatMessage({socket}:any) {
  
  const [message, setMessage] = useState('');

  let date = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  /* const handleSendMessage = async (e:any) =>{
    setMessage(e)
  } */

  const handleMessage = (e:any) => {
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

  const handleInput = async () => {
    console.log("handleInput data:", message)
    Setup(message)
  }
  
  return (
        <form className="msg" onSubmit={handleMessage}>
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
