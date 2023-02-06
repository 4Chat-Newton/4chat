import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../GlobalComponents/BoxContainer";

export default function Chat() {
  return (
    <>
      <BoxContainer className="chatContainer">
        <ChatWindow />
        <ChatMessage />
      </BoxContainer>
    </>
  );
}
