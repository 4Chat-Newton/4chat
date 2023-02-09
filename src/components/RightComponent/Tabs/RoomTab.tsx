import { useState } from "react";
import ListComponent from "../../GlobalComponents/ListComponent";
import TabComponent from "../../GlobalComponents/TabComponent";

const RoomTab = () =>{
    const[rooms, setRooms] = useState([])

    fetch('http://localhost:8080/data/room')
        .then(res => res.json())
        .then(data => {
            // console.log('r10',data)
            setRooms(data)
        })

        if(rooms.length > 0) return (<ListComponent rooms={rooms}/>)

    return (
        <TabComponent className="RoomTab">
            <h2>Rooms</h2>
            <p>Establish database connection </p>
        </TabComponent>
    );
};
export default RoomTab