import { useEffect, useState } from "react";
import ListComponent from "../../globalComponents/ListComponent";
import TabComponent from "../../globalComponents/TabComponent";

const ChatTab = () => {
    const[joinedRooms, setJoinedRooms] = useState([])

        useEffect(() => {
            fetch('http://localhost:8080/data/room/join', {
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
    
 

        if(joinedRooms.length > 0) return (<ListComponent rooms={joinedRooms}/>)


    return (
        <TabComponent className="InboxTab">
            <h2>DM</h2>
            Establish database connection
        </TabComponent>
    );
};

export default ChatTab