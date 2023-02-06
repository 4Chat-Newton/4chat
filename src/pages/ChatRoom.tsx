import Navbar from "../components/GlobalComponents/Navbar"
import Chat from "../components/Chat/Chat"
import Inbox from "../components/RightComponent/Inbox"
import BoxContainer from "../components/GlobalComponents/BoxContainer"
export default function ChatRoom() {
    return <>
        <Navbar />
        <BoxContainer className="chatBox">
        <Inbox />
        <Chat />
        </BoxContainer>
    </>
}
