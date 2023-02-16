import { useEffect, useState } from "react";
import ListComponent from "../../globalComponents/ListComponent";
import TabComponent from "../../globalComponents/TabComponent";
import {API_BASE_URL} from "../../../consts"

const RoomTab = () => {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch(`${API_BASE_URL}/data/room`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setRooms(data)
            })
    }, [])

    if (rooms.length > 0) return (<ListComponent rooms={rooms} />)

    return (
        <TabComponent className="RoomTab">
            <h2>Rooms</h2>
            <p>Establish database connection </p>
        </TabComponent>
    );
};
export default RoomTab