// import { useEffect, useState } from 'react';
import { emit } from "process";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

// socket.on('connection', (socket) => {
//   console.log('hello');
// });


function App() {


  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")

  let temp:string[] = []

  const sendMessage = () => {
    socket.emit("send_message", {message})
    let msg = messageReceived
    temp.push(msg)
    console.log(temp)
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);

    })
  }, [socket])

  function showElements() {
    temp.forEach(element => console.log(element))
    return temp
  }
  

  return (
    <div className='App'>
      <input placeholder="Message" onChange={(event) => {
        setMessage(event.target.value)


      }}/>
      <button onClick={sendMessage}>Send message</button>
      <h1>Message received:</h1>

      {messageReceived}
      
     

    </div>
  );
}

export default App;
