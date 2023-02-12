import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import Inbox from "../components/rightComponent/Inbox"
import BoxContainer from "../components/globalComponents/BoxContainer"

export default function ChatRoom() {
    return <>
        <Navbar />
        <BoxContainer className="chatBox">
        <Inbox />
        <Chat />
        </BoxContainer>
    </>
}
