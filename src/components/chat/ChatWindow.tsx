import "./Chat.css"
import {useContext, useEffect} from "react";
import activeRoomContext from "../../ActiveRoomContext";
import {GetMsgFromRoom} from "../controller/Controller";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

export default function ChatWindow({messages: socketRespons}:any) {
    const { activeRoom, activeRoomId } = useContext(activeRoomContext);

  return (<>
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header">
            <span>Sending messages to: </span>
            <h1> {` #${activeRoom}`}</h1>
          </div>
        </section>
        <section className="chat">
          <ul className="text">
            {socketRespons.map((msg: any) => (
           (<li key={msg.id} >
              <span id="timeStamp">{`[${msg.timeStamp}]`}</span>
              <span id="userMsg" style={{color: "lightcyan" }}>{`[@${msg.user}]`}</span>
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