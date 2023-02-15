import {useContext} from "react";
import activeRoomContext from "../../ActiveRoomContext";


export const StoreMessage = (senderId: any, receiverId: string, msg: string, timestamp: string) => {

    // Check if receiver id is a room or not (DM)
    // Check if name is # (is a room) or @ (is a user)
    //Get
    // GetRoomOnName().then((data) => {
    //     return data
    // })
    console.log("Store:",senderId )
    console.log("Store:",receiverId )
    console.log("Store:",msg )
    console.log("Store:",timestamp )

    fetch("/data/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            // sender_id: senderId,  // is Collected in back-end
            receiver_id: receiverId,
            room: true, // if it's a room or DM
            message: msg,
            timestamp: timestamp,
            // deleted: "",
            // reported: "",
            // edited_message: ""
        }),
    }).then(function (response) {
        if (response.ok) {
            console.log("Message stored!")
        } else {
            console.log("Message NOT stored!")
        }
    }).catch((e)=>{
        console.log("Error: ", e)
    });
}

// GetRoomOnName
// Get a json object of room based on name
export const GetRoomOnName = () => {
    // const { activeRoom } = useContext(activeRoomContext);

    return fetch('/data/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            alert(`Error ${response.status}`)
        }
    }).then(data => {
        localStorage.setItem("user_id", data.id)
        localStorage.setItem("username", data.username)
        return data
        // localStorage.setItem("isLoggedIn", data.isLoggedIn)
    })
}

// export {StoreMessage, GetRoomOnName}