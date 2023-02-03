// import { useEffect, useState } from 'react';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function App() {
  const [message, setMessage] = useState({
    user: "as",
    text: "",
    time: "12.12",
  });

  const [messagesList, setMessagesList] = useState<any>([]);
  const [responseMessagesList, setResponseMessagesList] = useState<any>([]);

  const handleChange = (e:any) => {
    const name = e.target.name
    const value = e.target.value

    setMessage({...message, [name]: value})
    
  }

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log(message);
    // if (message.trim() && //!KOLLA TOKEN OCH HÄMTA('userName')) {
    if (message.text.trim()) {
      //todo lägg till kontroller för user och time

      socket.emit("message", {
        msg: message,
        // name: localStorage.getItem('userName'),//! ska kolla JWT token
        socketID: socket.id,
      });

      const newMessage = { ...message };

      setMessagesList([...messagesList, newMessage]);
    }
    console.log("r29 messagesList: ", messagesList);

    setMessage({
      user: "as",
      text: "",
      time: "12.12",
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //alert(data.msg.text);
      const newMessage = { ...message };
      setResponseMessagesList([...messagesList, newMessage]);
      
      console.log("r73:", data);
      setMessage({
        user: "as",
        text: "",
        time: "12.12",
      });
    });
  }, [socket]);

  return (
    <div className="App">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          name = "text"
          value={message.text}
          onChange={handleChange}
        />
        <button className="sendBtn">SEND</button>
      </form>
      <h1>Message received:</h1>
      <ul id="message-list">
        {messagesList?.map((msg: any) => (
           (<li key={socket.id}>{msg.text}</li>)
        ))}
      </ul>
      <ul id="message-list">
        {responseMessagesList?.map((msg: any) => (
           (<li key={socket.id}>{msg.text}</li>)
        ))}
      </ul>
    </div>
  );
}

export default App;
