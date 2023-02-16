import { useContext, useState } from "react";
import activeRoomContext from "../../ActiveRoomContext";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../../consts"
import {GetMsgFromJoinedRoom, GetMsgFromRoom} from "../controller/Controller";

const RoomListItem: any = (props: any) => {
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const [currentText, setCurrentText] = useState("")
    const [messages, setMessages] = useState<any>([]);
    let socket = props.socketConnection

    let date = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const { setActiveRoom, setActiveRoomId, activeRoomId, activeRoom } = useContext(activeRoomContext);
    function handleActiveRoom(data: any) {
        setActiveRoom(data);
        setActiveRoomId(props.room.room_id) // room id is called "room_id" from props
        navigate(`/chatroom/${data}`)
        // GetMsgFromRoom(activeRoomId)
        // GetMsgFromJoinedRoom(activeRoomId)
        //handleActive(event)
        //navigate(`/chatroom/${data}`)
    }

    const leaveSocket = (data: any) => {
        if (data !== "") {
            let message =
            {
                text: "*** @" + localStorage.getItem('username') + " left #" + data + "! ***",
                user: "FRIENDLY_BOT",
                timeStamp: date,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
                room: data
            }
            socket.emit("leave_room", { room: data, message: message })
        }
    }


    const leaveRoom = async () => {
        if (props.room.room_id) {
            fetch(`${API_BASE_URL}/data/room/leave`, {
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
                    //alert(`You left room #${props.room.name}!`);
                    leaveSocket(props.room.name)
                } else {
                    alert(`You've yet to join #${props.room.name}!`);
                }
            });

        } else {
            alert(`#${props.room.name} doesn't exist!`)
        }
    }

    // const handleActive = (event: any) => {
    //     if (!event.currentTarget.classList.contains(isActive)) {
    //         event.currentTarget.classList.add(isActive)
    //         document.querySelector(".isActive")?.add
    //     }
    //     event.currentTarget.classList.add(isActive)
    //     console.log(event.currentTarget)
    // }

    const handleToggle = () => {
        console.log(isActive)
        setIsActive(!isActive);
        console.log(isActive)
        handleActiveRoom(props.room.name)
    };

    // toggleSidenav() {
    //     var css = (this.props.showHideSidenav === "hidden") ? "show" : "hidden";
    //     this.setState({"showHideSidenav":css});
    // }

    return (
         <li className="listItemRoom" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} onClick={(event) => handleActiveRoom(props.room.name)}>
            {/* <li className={`listItemRoom-${isActive ? "active" : "inactive"}`} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} onClick={handleToggle}> */}
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
