import { useState } from "react";
import "./Inbox.css";
// import InboxTab from "./tabs/InboxTab";
// import RoomTab from "./tabs/RoomTab";

export default function Inbox() {

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
        {/*<ul className="inboxBtns">*/}
        {/*  <li className={activeTab === "inbox" ? "active" : ""} onClick={handleInbox}>Inbox</li>*/}
        {/*  <li className={activeTab === "rooms" ? "active" : ""} onClick={handleRoom}>Rooms</li>*/}
        {/*</ul>*/}
        {/*<div className="outlet">*/}
        {/*  {activeTab === "inbox" ? <InboxTab /> : <RoomTab />}*/}
        {/*</div>*/}
      </section>
    </>
  );
}
