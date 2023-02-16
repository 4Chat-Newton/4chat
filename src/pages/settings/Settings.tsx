import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed
import BoxContainer from "../../components/globalComponents/BoxContainer";
import Navbar from "../../components/globalComponents/Navbar";
import DeleteAccount from "./DeleteAccount";
import EditAccount from "./EditAccount";
import Inbox from "../../components/rightComponent/RightComponent";

export default function Settings() {




    return (
        <>
        <Navbar />
        <BoxContainer className="chatBox">
        <Inbox />
        <BoxContainer className="settingsContainer">
        <div className="settingsWindow">
        <section className="settingsheader">
            <h1>#Settings</h1>
        </section>
        < EditAccount />
        < DeleteAccount />

        </div>
        </BoxContainer>        
        </BoxContainer>
        </>
    )
}
