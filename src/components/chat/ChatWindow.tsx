import "./Chat.css"
import {useContext, useEffect} from "react";
import activeRoomContext from "../../ActiveRoomContext";

export default function ChatWindow({messages: socketRespons}:any) {
    const { activeRoom } = useContext(activeRoomContext);

  return (<>
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header">
            <h1>{`#${activeRoom}`}</h1>
          </div>
        </section>
        <section className="chat">
          <ul className="text">
            {socketRespons.map((msg: any) => (
           (<li key={msg.id}>
              <span id="timeStamp">{`[${msg.timeStamp}]`}</span>
              <span id="userMsg">{`[${msg.user}]`}</span>
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