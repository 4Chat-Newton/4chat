// import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import BoxContainer from "../components/globalComponents/BoxContainer"
import Inbox from "../components/rightComponent/Inbox";
export default function ChatRoom() {
    return <>
        {/*<Navbar />*/}
        <BoxContainer className="chatBox">
        <Inbox />
        <Chat />
        </BoxContainer>
    </>
}
