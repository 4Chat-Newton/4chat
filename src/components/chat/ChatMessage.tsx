import {useContext, useEffect, useState} from "react";
import "../style.css";
import {Setup} from "../commandHandler/Setup";
import {GetMsgFromRoom, StoreMessage} from "../controller/Controller";
import activeRoomContext from "../../ActiveRoomContext";


export default function ChatMessage({socket}: any) {

    const [message, setMessage] = useState('');
    let roomName = "Home"
    const {activeRoom, activeRoomId} = useContext(activeRoomContext);

    let date = new Date().toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"});

  const handleSendMessage = (e:any) => {
      let userId = localStorage.getItem('user_id')
      let userName = localStorage.getItem('username')
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        user: userName,
        timeStamp: date,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: activeRoom
      });
    }
    setMessage('');
      // Send message to a storing function
      // parse userId to integer
      StoreMessage(userId, activeRoomId, message, date, socket.id, userName, activeRoom)
  };

    const handleInput = async () => {
        Setup(message)
    }

    return (
        <form className="msg" onSubmit={handleSendMessage}>

            <input
                disabled={activeRoom === "" ? true : false }
                style={{color:"lightgreen"}}
                type="text"
                className="msger-input"
                placeholder={activeRoom === "" ? "Please enter a room..." : "Enter your message..." }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button disabled={activeRoom === "" ? true : false } type="submit" className="send" onClick={handleInput}>
                Send
            </button>
        </form>
  );
}