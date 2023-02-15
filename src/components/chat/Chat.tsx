import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../globalComponents/BoxContainer";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import activeRoomContext from "../../ActiveRoomContext";


const Chat = (props:any) => {
  const [messages, setMessages] = useState<any>([]);

  let socket = props.socketConnection

  useEffect(() => {
    socket.on('messageResponse', (data:any) => setMessages([...messages, data]));
    console.log("messagesList: ", messages)
    // socket.on('messageResponse', (data) => {
    //     console.log("useEffect: ", data)
    // })
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