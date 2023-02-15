import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../globalComponents/BoxContainer";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import activeRoomContext from "../../ActiveRoomContext";

const socket = io("http://localhost:8080");


const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const { activeRoom } = useContext(activeRoomContext);


  useEffect(() => {
    console.log("first")
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    console.log("messagesList: ", messages)
  }, [socket, messages]);
  
  socket.onAny((event, ...args) => {
    console.log("CLIENT: ", event, args);
  });

  return (
    <>
    <BoxContainer className="chatContainer">
        <ChatWindow messages={messages}/>
        {/*<div className="chatSeperator"></div>*/}
        <ChatMessage socket={socket}/>
      </BoxContainer>
    </>
  );
}
export default Chat;