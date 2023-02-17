import "./Chat.css"
import { createRef, useContext, useEffect } from "react";
import activeRoomContext from "../../ActiveRoomContext";
import { GetMsgFromJoinedRoom, GetMsgFromRoom } from "../controller/Controller";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

export default function ChatWindow({ messages: socketRespons }: any) {
  const { activeRoom, activeRoomId, oldMessages, setOldMessages } = useContext(activeRoomContext);

  const chatContainer: any = createRef()

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    scrollToMyRef()
  }, [chatContainer])

  const getMessages = async () => {
    setOldMessages(await GetMsgFromJoinedRoom())
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