import "../style.css";

export default function ChatMessage() {
  return (
    <>
      <div className="msg">
        <input
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
        />
        <button type="submit" className="send">
          Send
        </button>
      </div>
    </>
  );
}
