import { useState } from "react";

const RoomListItem: any = (props: any) => {
    const [isShown, setIsShown] = useState(false);

    const joinRoom = ()=>{
        console.log(`clicked "${props.room.name}" with id ${props.room.id}`)
    }

    return (
        <li className="listItemRoom" onMouseEnter={() => setIsShown(true)} onMouseLeave={()=>setIsShown(false)} onClick={joinRoom}>
            <div>
            <span>#</span>
            {props.room.name}
            </div>
            {isShown && (
                <button> + </button>
            )}
        </li>
    );
};

export default RoomListItem;
