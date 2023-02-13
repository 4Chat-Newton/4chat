import { useState } from "react";

export default function Setup(data: string) {
    // const [room, setRoom] = useState('');

    const findTerm = (term: string) => {
        if (data.startsWith(term)) {
            return data;
        }
    };

    const findRoom = async (roomName: string) => {
        fetch("http://localhost:8080/data/room/" + roomName)
            .then((res) => res.json())
            .then((data) => {
                // console.log('r10',data)
                //let room = data.find(roomName);
                // setRoom(rum)
                //console.log(data.id);
                return data.id
            });
    };

    switch (data) {
        case findTerm("/create #"):
            // /create #roomName
            let name = data.replace("/create #", "");
            //name.split('#')
            fetch("http://localhost:8080/data/room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: name,
                }),
            }).then(function (response) {
                if (response.ok) {
                    alert(`Room ${name} created!`);
                } else {
                    alert("Error creating room!");
                }
            });
            break;
        case findTerm("/join #"):
            let roomToJoin = data.replace("/join #", "");
            const roomId = findRoom(roomToJoin)

            fetch("http://localhost:8080/data/room/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("userId"),
                    room_id: roomId
                }),
            }).then(function (response) {
                if (response.ok) {
                    alert(`Joined room ${roomToJoin}!`);
                } else {
                    alert("Error joining room!");
                }
            });

            

            break;
        default:
            break;
    }
    // if (data.startsWith("/create", 0)) {
    //     let name = data.replace("/create ", "")
    //     fetch('http://localhost:8080/data/room', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${localStorage.getItem("token")}`
    //         },
    //         body: JSON.stringify( {
    //             name: name
    //         })
    //     }).then(function (response) {
    //         if (response.ok) {
    //             alert(`Room ${name} created!`)
    //         } else {
    //             alert("Error creating room!")
    //         }
    //     });
    // }
}
