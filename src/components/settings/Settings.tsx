import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed
import BoxContainer from "../globalComponents/BoxContainer";
import Navbar from "../globalComponents/Navbar";
import Inbox from "../rightComponent/Inbox";
import DeleteAccount from "./DeleteAccount";
import EditAccount from "./EditAccount";

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
