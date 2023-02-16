import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import RightComponent from "../components/rightComponent/RightComponent"
import BoxContainer from "../components/globalComponents/BoxContainer"
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

socket.onAny((event, ...args) => {
    console.log("CLIENT: ", event, args);
  });


export default function ChatRoom() {
    return <>
        <Navbar />
        <BoxContainer className="chatBox">
        <RightComponent socketConnection={socket} />
        <Chat socketConnection={socket} />
        </BoxContainer>
    </>
}
