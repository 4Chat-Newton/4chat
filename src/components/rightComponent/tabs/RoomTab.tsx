import { useEffect, useState } from "react";
import ListComponent from "../../globalComponents/ListComponent";
import TabComponent from "../../globalComponents/TabComponent";

const RoomTab = (props:any) => {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/data/room', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setRooms(data)
                console.log(rooms)
            })
    }, [])
    if (rooms.length > 0) return (<ListComponent socketConnection={props.socketConnection} rooms={rooms} />)

    return (
        <TabComponent className="RoomTab">
            <h2>Rooms</h2>
            <p>Establish database connection </p>
        </TabComponent>
    );
};
export default RoomTab