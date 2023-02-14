import "./Chat.css"
import { GlobalStateInterface, useGlobalState } from "../../GlobalContext";

export default function ChatWindow({messages: socketRespons}:any) {
  const { userContext } = useGlobalState();
  return (<>
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header">
            <h1>{`#${userContext.activeRoom}`}</h1>
          </div>
        </section>
        <section className="chat">
          <ul className="text">
            {socketRespons.map((msg: any) => (
           (<li key={msg.id}>
              <span id="timeStamp">{`[${msg.timeStamp}]`}</span>
              <span id="userMsg">{`[${msg.user}]`}</span>
              <span id="textMsg">{`: ${msg.text}`}</span>
            </li>)
        ))}
          </ul>
        </section>
      </div>
      </>
  );
}