import {useContext, useState} from "react";
import activeRoomContext from "../../ActiveRoomContext";
import {useNavigate} from "react-router-dom";
import { io } from "socket.io-client";

// const socket = io("http://localhost:8080");

const RoomListItem: any = (props: any) => {
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(false);

    const { setActiveRoom } = useContext(activeRoomContext);
    function handleActiveRoom(data: any) {
        setActiveRoom(data);
        navigate(`/chatroom/${data}`)
        // joinSocket(data)
    }

    // const joinSocket = (data:any) => {
    //     console.log("joining socket: " + data)
    //     if (data !== "") {
    //       socket.emit("join_room", {room: data})
    //       socket.emit("getRoomSockets", data)
    //     }
    //   }

    const leaveRoom = async ()=>{
        if (props.room.room_id) {
            fetch("http://localhost:8080/data/room/leave", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("user_id"),
                    room_id: props.room.room_id
                }),
            }).then(function (response) {
                if (response.ok) {
                    alert(`You left room #${props.room.name}!`);
                } else {
                    alert(`You've yet to join #${props.room.name}!`);
                }
            });

        } else {
            alert(`#${props.room.name} doesn't exist!`)
        }
    }

    return (
        <li className="listItemRoom" onMouseEnter={() => setIsShown(true)} onMouseLeave={()=>setIsShown(false)} onClick={() => handleActiveRoom(props.room.name)}>
            <div>
            <span>#</span>
            {props.room.name}
            </div>
            {isShown && (
                <button className="joinBtn" onClick={() => leaveRoom()}>—</button>
            )}
        </li>
    );
};

export default RoomListItem;
