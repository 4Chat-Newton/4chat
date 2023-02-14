import Navbar from "../components/globalComponents/Navbar"
import Chat from "../components/chat/Chat"
import RightComponent from "../components/rightComponent/RightComponent"
import BoxContainer from "../components/globalComponents/BoxContainer"
import { GlobalStateProvider } from "../GlobalContext";

export default function ChatRoom() {
    return <>
        <GlobalStateProvider>
        <Navbar />
        <BoxContainer className="chatBox">
        <RightComponent />
        <Chat />
        </BoxContainer>
        </GlobalStateProvider>
    </>
}
