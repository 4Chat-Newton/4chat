import "./Chat.css"

export default function ChatWindow() {
  return (
    <>
      <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header">
            <h1>#Room</h1>
          </div>
        </section>
        <section className="chat">
          <ul className="text">
            {Array(50).fill(null).map(() => (<p>oi</p>))}
          </ul>
        </section>
      </div>
    </>
  );
}
