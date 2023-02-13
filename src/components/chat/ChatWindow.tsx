import "./Chat.css"

export default function ChatWindow({messages: socketRespons}:any) {
  return (<>
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header">
            <h1>#Room</h1>
          </div>
        </section>
        <section className="chat">
          <ul className="text">
            {socketRespons.map((msg: any) => (
           (<li key={msg.id}>{`[${msg.timeStamp}][${msg.user}]: ${msg.text}`}</li>)
        ))}
          </ul>
        </section>
      </div>
      </>
  );
}
