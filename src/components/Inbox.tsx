import "./style.css";

export default function Inbox() {
    const mockArray = ["Måns", "Sami", "Barkat"]

    
  return (
    <>
      <div className="test!!">
        <div className="msger-inbox">
          <div>
            <div>
              <button className="users">Users</button>
              <button className="rooms">Rooms</button>
            </div>
          </div>

          <div>
            <ul>
                {/* If users or rooms, Append list <li>*/}
            {/*     {if(queryselector(".room").hasClass("active")){
                return UserList
                }else {return InboxList} */}
            </ul>
          </div>


        </div>
      </div>
    </>
  );
}
