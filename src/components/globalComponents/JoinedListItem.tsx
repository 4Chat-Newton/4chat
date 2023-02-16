import {useContext, useState} from "react";

import activeRoomContext from "../../ActiveRoomContext";
import {useNavigate} from "react-router-dom";
import {GetMsgFromJoinedRoom, GetMsgFromRoom} from "../controller/Controller";

const RoomListItem: any = (props: any) => {
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(false);

    const { setActiveRoom, setActiveRoomId, activeRoomId } = useContext(activeRoomContext);
    function handleActiveRoom(data: any) {
        setActiveRoom(data);
        setActiveRoomId(props.room.room_id) // room id is called "room_id" from props
        navigate(`/chatroom/${data}`)
        // GetMsgFromRoom(activeRoomId)
        // GetMsgFromJoinedRoom(activeRoomId)
    }

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
