import { useEffect, useState } from "react";
import ListComponent from "../../globalComponents/ListComponent";
import TabComponent from "../../globalComponents/TabComponent";
import {API_BASE_URL} from "../../../consts"

const RoomTab = (props:any) => {
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
    if (rooms.length > 0) return (<ListComponent socketConnection={props.socketConnection} rooms={rooms} />)


    return (
        <TabComponent className="RoomTab">
            <p>Loading</p>
            {/*Cool Animation 1*/}
            {/*<div className="lds-ellipsis">*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*</div>*/}

            {/*Cool Animation 2*/}
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </TabComponent>
    );
};
export default RoomTab