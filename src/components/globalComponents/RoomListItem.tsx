import { useContext, useState } from "react";
import activeRoomContext from "../../ActiveRoomContext";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../consts";

const RoomListItem: any = (props: any) => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  //   let pageExist = false;
  let date = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const joinSocket = (data: any) => {
    let socket = props.socketConnection;

    if (data !== "") {
      let message = {
        text: "*** @" + localStorage.getItem("username") + " joined #" + data + "! ***",
        user: "FRIENDLY_BOT",
        timeStamp: date,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: data,
      };
      socket.emit("join_room", { message: message, room: data });
      socket.emit("getRoomSockets", data);
    }
  };

  const { setActiveRoom, activeRoom, setActiveRoomId } = useContext(activeRoomContext);

  function handleActiveRoom(data: any) {
    setActiveRoom(data);
    //navigate(`/chatroom/${data}`);
    setActiveRoomId(props.room.id) // room id is called "id" from props
    joinSocket(data);
    joinRoom();
  }

  const joinRoom = async () => {
    if (props.room.id) {
      fetch(`${API_BASE_URL}/data/room/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          room_id: props.room.id,
        }),
      }).then(function (response) {
        if (response.ok) {
          const newRoomList = props.rooms.filter((r: any) => r.id !== props.room.id);
          props.setRooms(newRoomList)
          //   alert(`You joined room #${props.room.name}!`);
        } else {
          alert(`You've already joined #${props.room.name}!`);
        }
      });
    } else {
      alert(`#${props.room.name} doesn't exist!`);
    }
  };

  return (
    <li
      className="listItemRoom"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      onClick={() => handleActiveRoom(props.room.name)}
    >
      <div>
        <span>#</span>
        {props.room.name}
      </div>
      {isShown && <span> + </span>}
    </li>
  );
};

export default RoomListItem;
