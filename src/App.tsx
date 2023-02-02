// import { useEffect, useState } from 'react';
import { emit } from "process";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<any>([]);
  const [messageReceived, setMessageReceived] = useState("");


  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log(message);
    // if (message.trim() && //!KOLLA TOKEN OCH HÄMTA('userName')) {
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        // name: localStorage.getItem('userName'),//! ska kolla JWT token
        socketID: socket.id,
      });
      
      const newMessage = message;

      setMessagesList([...messagesList, newMessage])
    }
    console.log(messagesList);
    
    setMessage('');
  };

let temp;

  useEffect(() => {
    socket.on("receive_message", (data) => {
      temp = messagesList.map((msg:any)=>{
        <li>{msg}</li>
      })
      setMessageReceived(data.message);
    });
  }, [socket]);


  return (
    <div className="App">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
      <h1>Message received:</h1>
      <ul id="message-list">
        {messagesList.map((msg:string)=>(<li>{msg}</li>))}
      </ul>
    </div>
  );
}

export default App;
