import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../globalComponents/BoxContainer";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import {API_BASE_URL} from "../../consts"
import {GetMsgFromJoinedRoom} from "../controller/Controller";

const socket = io(`${API_BASE_URL}`);


const Chat = (props:any) => {
  const [messages, setMessages] = useState<any>([]);

  let socket = props.socketConnection

  useEffect(() => {
    socket.on('messageResponse', (data:any) => setMessages([...messages, data]));
    // socket.on('messageResponse', (data:any) => GetMsgFromJoinedRoom());
    // GetMsgFromJoinedRoom()
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