import { useState } from "react";
import "./rightComponent.css";
import ChatTab from "./tabs/ChatTab";
import RoomTab from "./tabs/RoomTab";

export default function RightComponent(props:any) {

    const[activeTab, setActiveTab] = useState("inbox")

    const handleInbox = () =>{
        setActiveTab("inbox")
    }

    const handleRoom = () =>{
        setActiveTab("rooms")
    }


    return (
        <>
            <section className="inbox">
                <ul className="inboxBtns">
                    <li className={activeTab === "inbox" ? "active" : ""} onClick={handleInbox}>Joined</li>
                    <li className={activeTab === "rooms" ? "active" : ""} onClick={handleRoom}>Browse</li>
                </ul>
                <div className="outlet">
                    {activeTab === "inbox" ? <ChatTab socketConnection={props.socketConnection} /> : <RoomTab />}
                </div>
            </section>
        </>
    );
}