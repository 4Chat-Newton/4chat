import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../GlobalComponents/BoxContainer";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:8080");



const Chat = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <>
    <BoxContainer className="chatContainer">
        <ChatWindow messages={messages}/>
        <ChatMessage socket={socket}/>
      </BoxContainer>
    </>
  );
}
export default Chat;
