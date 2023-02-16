import { useEffect, useState } from "react";
import JoinedComponent from "../../globalComponents/JoinedListComponent";
import TabComponent from "../../globalComponents/TabComponent";
import {API_BASE_URL} from "../../../consts"

const ChatTab = (props:any) => {
    const[joinedRooms, setJoinedRooms] = useState([])

        useEffect(() => {
            fetch(`http://localhost:8080/data/room/joined`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setJoinedRooms(data)
                })
        }, [])
    
 

        if(joinedRooms.length > 0) return (<JoinedComponent socketConnection={props.socketConnection} rooms={joinedRooms}/>)


    return (
        <TabComponent className="InboxTab">
            <h2>DM</h2>
            Establish database connection
        </TabComponent>
    );
};

export default ChatTab