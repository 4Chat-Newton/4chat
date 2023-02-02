// import { useEffect, useState } from 'react';
import { emit } from "process";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

// socket.on('connection', (socket) => {
//   console.log('hello');
// });


function App() {

  const sendMessage = () => {
    //socket.emit()
  }


  return (
    <div className='App'>
      <input placeholder="Message"/>
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}

export default App;
