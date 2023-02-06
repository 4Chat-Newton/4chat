import ButtonComponent from "../GlobalComponents/ButtonComponent";
import "./Inbox.css";

export default function Inbox() {

  return (
    <>
      <section className="inbox">
        <div className="inboxBtns">
          <ButtonComponent className="inboxBtn">Inbox</ButtonComponent>
          <ButtonComponent className="roomsBtn">Rooms</ButtonComponent>
        </div>
      </section>
    </>
  );
}
