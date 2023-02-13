import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import RightComponent from "../components/rightComponent/RightComponent"
import BoxContainer from "../components/globalComponents/BoxContainer"

export default function ChatRoom() {
    return <>
        <Navbar />
        <BoxContainer className="chatBox">
        <RightComponent />
        <Chat />
        </BoxContainer>
    </>
}
