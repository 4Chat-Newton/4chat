import { useState } from "react";
import ButtonComponent from "../GlobalComponents/ButtonComponent";
import "./Inbox.css";

export default function Inbox() {

  const [isActive, setActive] = useState(true);
  const toggleClass = () => {
    setActive(!isActive);
  }


  return (
    <>
      <section className="inbox">
        <div className="inboxBtns">
      <ButtonComponent onClick={()=> setActive(!isActive)} className={isActive ? "active" : null}>Inbox</ButtonComponent>
          <ButtonComponent className="roomsBtn">Rooms</ButtonComponent>
        </div>
      </section>
    </>
  );
}
