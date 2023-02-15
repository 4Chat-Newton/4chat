import {useContext} from "react";
import activeRoomContext from "../../ActiveRoomContext";


export const StoreMessage = async (senderId: any, receiverId: string, msg: string, timestamp: string, socketId: string) => {

    // Check if receiver id is a room or not (DM)
    // Check if name is # (is a room) or @ (is a user)
    //Get

    fetch("/data/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            //senderId,   is Collected in back-end
            receiver_id: receiverId,
            room: 1, // if it's a room 1 for true or DM 0 for false
            message: msg,
            timestamp: timestamp.toString(), // convert from date to string. Quickfix
            deleted: 0, // Not deleted
            reported: 0, // Not reported
            edited_message: "null", // Not edited
            socket_id: socketId
        }),
    }).then(function (response) {
        if (response.ok) {
            console.log("Message stored!")
        } else {
            console.log("Message NOT stored!")
        }
    }).catch((e) => {
        console.log("Error: ", e)
    });
}

// GetRoomOnName
// Get a json object of room based on name
export const GetMsgFromRoom = (roomName: string) => {

    return fetch(`/data/message/${roomName}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(response)
            return response.json()
        } else {
            console.log(`Failed to retrieve room Error.`)
            return response.json()
        }
    })
    //     .catch((e) => {
    //     console.log("Error: ", e)
    // })
}

// export {StoreMessage, GetRoomOnName}