import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import RightComponent from "../components/rightComponent/RightComponent"
import BoxContainer from "../components/globalComponents/BoxContainer"
import {useContext} from "react";
import activeRoomContext from "../ActiveRoomContext";



export default function ChatRoom(props:any) {

    const { joinedRooms } = useContext(activeRoomContext);

    let socket = props.socketConnection
    console.log("chatroom: ", socket)
    socket.emit("join_all_joined_rooms", joinedRooms);
    return <>
        <Navbar />
        <BoxContainer className="chatBox">
        <RightComponent socketConnection={socket} />
        <Chat socketConnection={socket} />
        </BoxContainer>
    </>
}
