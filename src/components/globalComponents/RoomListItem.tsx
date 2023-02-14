import {useContext, useState} from "react";

import activeRoomContext from "../../ActiveRoomContext";
import {useNavigate} from "react-router-dom";

const RoomListItem: any = (props: any) => {
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(false);

    const { setActiveRoom } = useContext(activeRoomContext);
    function handleActiveRoom(data: any) {
        setActiveRoom(data);
        navigate(`/chatroom/${data}`)
        joinRoom()
    }

    const joinRoom = async ()=>{
        if (props.room.id) {
            fetch("/data/room/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("user_id"),
                    room_id: props.room.id
                }),
            }).then(function (response) {
                if (response.ok) {
                    alert(`You joined room #${props.room.name}!`);
                } else {
                    alert(`You've already joined #${props.room.name}!`);
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
                <button> + </button>
            )}
        </li>
    );
};

export default RoomListItem;
