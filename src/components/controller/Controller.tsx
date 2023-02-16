
//StoreMessage
// Store a message into the db
export const StoreMessage = async (senderId: any, receiverId: number, msg: string, timestamp: string, socketId: string) => {

    // Check if receiver id is a room or not (DM)
    // Check if name is # (is a room) or @ (is a user)
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
// Get messanges from a Room based on room id.
export const GetMsgFromRoom = (roomId: number) => {

    return fetch(`/data/message/room-messages` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            receiver_id: roomId
        })
    }).then(function (response) {
        if (response.ok) {
            console.log(response)
            return response.json()
        } else {
            console.log(`Failed to retrieve room's messages Error.`)
            return null
        }
    })
    //     .catch((e) => {
    //     console.log("Error: ", e)
    // })
}

// GetRoomOnName
// Get messanges from a Room based on room id.
export const GetMsgFromJoinedRoom = (roomId: number) => {

    return fetch(`/data/message/user-messages` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    }).then(function (response) {
        if (response.ok) {
            console.log(response)
            return response.json()
        } else {
            console.log(`Failed to retrieve joined room's messages Error.`)
            return null
        }
    })
    //     .catch((e) => {
    //     console.log("Error: ", e)
    // })
}
