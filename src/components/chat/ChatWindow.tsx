import "./Chat.css"
import { createRef, useContext, useEffect } from "react";
import activeRoomContext from "../../ActiveRoomContext";
import { GetMsgFromJoinedRoom, GetMsgFromRoom } from "../controller/Controller";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
import { API_BASE_URL } from "../../consts";

export default function ChatWindow({ messages: socketRespons }: any, props: any) {
  const { activeRoom, activeRoomId, oldMessages, setOldMessages, joinedRooms, setJoinedRooms } = useContext(activeRoomContext);

  const chatContainer: any = createRef()

  useEffect(() => {
    loadJoinedRooms()
    joinSockets()
    getMessages()
  }, [])

  useEffect(() => {
    scrollToMyRef()
  }, [chatContainer])

  const getMessages = async () => {
    setOldMessages(await GetMsgFromJoinedRoom())
  }


  const loadJoinedRooms = async () => {
    const result = await fetch(`${API_BASE_URL}/data/room/joined/names`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then((data)=>{
        return data.json()

    }).catch((e)=>{
        console.log("Error: ", e)
    })
    setJoinedRooms(result)
}

  const joinSockets = async () => {
    props.socket.emit("join_all_joined_rooms", joinedRooms);
  }



  const loadMsgs = () => {
    // setOldMessages( await GetMsgFromJoinedRoom())
    // console.log("oldMessages: ", oldMessages)
    return oldMessages.map((msg: any) => (
      (<li key={msg.id}>
        <span id="timeStamp">{`[${msg.timestamp}]`}</span>
        <span id="userMsg" style={{ color: "yellow" }}>{`[@${msg.username}]`}</span>
        <span id="roomMsg">{`[#${msg.room_name}]`}</span>
        <span id="textMsg">{`: ${msg.message}`}</span>
      </li>)
    ))
  }

  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight -
      chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
  };

  return (<>
    <div className="chatWindow">
      <section className="roomName">
        <div className="roomName-header">
          <span>Sending messages to: </span>
          <h1> {` ${activeRoom === "" ? "" : `#${activeRoom}`}`}</h1>
        </div>
      </section>
      <section ref={chatContainer} className="chat">
        <ul className="text">
          {loadMsgs()}
          {socketRespons.map((msg: any) => (
            (<li key={msg.id} >
              <span id="timeStamp">{`[${msg.timeStamp}]`}</span>
              <span id="userMsg" style={{ color: "yellow" }}>{`[@${msg.user}]`}</span>
              <span id="roomMsg">{`[#${msg.room}]`}</span>
              <span id="textMsg">{`: ${msg.text}`}</span>
            </li>)
          ))}
        </ul>
      </section>
    </div>
  </>
  );
}