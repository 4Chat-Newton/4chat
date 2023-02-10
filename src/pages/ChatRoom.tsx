import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import BoxContainer from "../components/globalComponents/BoxContainer"
import InboxTab from "../components/rightComponent/tabs/InboxTab";
export default function ChatRoom() {
    return <>
        <Navbar />
        <BoxContainer className="chatBox">
        <InboxTab />
        <Chat />
        </BoxContainer>
    </>
}
