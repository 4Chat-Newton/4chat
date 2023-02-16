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
    
 

        if(joinedRooms.length > 0) return (<JoinedComponent socketConnection={props.socketConnection} setRooms={setJoinedRooms} rooms={joinedRooms}/>)


    return (
        <TabComponent className="InboxTab">
            Loading
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

export default ChatTab