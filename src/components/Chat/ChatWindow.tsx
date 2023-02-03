import "../style.css";

export default function ChatWindow({messages}:any) {
  return (
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header bg-blue-700">
            <h1>#Room</h1>
          </div>
        </section>
        <section className="chat">
          <ul className="text">
            {messages.map((msg: any) => (
           (<li key={msg.id}>{msg.text}</li>)
        ))}
          </ul>
        </section>
      </div>
  );
}
