import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import "../style.css";
import BoxContainer from "../GenericComponents/BoxContainer";

export default function Chat() {
  return (
    <>
    <BoxContainer>
        <ChatWindow/>
        <div className="chatSeperator"></div>
        <ChatMessage/>
      </BoxContainer>
    </>
  );
}
