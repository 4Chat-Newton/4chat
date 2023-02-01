import "./style.css";

export default function Inbox() {
    const mockArray = ["Måns", "Sami", "Barkat"]

    
  return (
    <>
      <section className="tabs">
        <div className="tabsdiv">
          <button className="inbox">Inbox</button>
          <button className="rooms">Rooms</button>
        </div>
      </section>
    </>
  );
}
