import "./Chat.css";
import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ messages: socketRespons }: any) {
//   const [messages, setMessages] = useState<string[]>([]);
  const container = useRef<HTMLUListElement>(null);

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      container.current as HTMLUListElement;
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
      container.current?.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    Scroll()    
  }, [socketRespons]);

  return (
    <>
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header">
            <h1>#Room</h1>
          </div>
        </section>
        <section className="chat" ref={container}>
          <ul className="text">
            {socketRespons.map((msg: any) => (
              <li
                key={msg.id}
              >{`[${msg.timeStamp}][${msg.user}]: ${msg.text}`}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
