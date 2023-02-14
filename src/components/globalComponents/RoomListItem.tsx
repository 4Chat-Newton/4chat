import { useState } from "react";

const RoomListItem: any = (props: any) => {
    const [isShown, setIsShown] = useState(false);

    const joinRoom = async ()=>{
        if (props.room.id) {
            fetch("http://localhost:8080/data/room/join", {
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
                    alert(`Joined room #${props.room.name}!`);
                } else {
                    alert(`You've already joined #${props.room.name}!`);
                }
            });

        } else {
            alert(`#${props.room.name} doesn't exist!`)
        }
    }

    return (
        <li className="listItemRoom" onMouseEnter={() => setIsShown(true)} onMouseLeave={()=>setIsShown(false)} onClick={joinRoom}>
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
