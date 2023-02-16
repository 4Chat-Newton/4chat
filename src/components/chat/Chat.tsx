import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../globalComponents/BoxContainer";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import {API_BASE_URL} from "../../consts"

const socket = io(`${API_BASE_URL}`);



const Chat = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    socket.onAny((event, ...args) => {
      console.log("CLIENT: ", event, args);
    });
  }, [socket, messages]);

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