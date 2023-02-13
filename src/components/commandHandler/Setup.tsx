import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../GlobalContext";


export default function Setup(data: string) {
    //const [room, setRoom] = useState(null);
    const { isLoggedIn } = useContext(GlobalContext) || { isLoggedIn: false}
    const { room } = useContext(GlobalContext) || { findRoom: [] }

    const findTerm = (term: string) => {
        if (data.startsWith(term)) {
            return data;
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/data/room/" + roomName)
            .then((res) => res.json())
            .then((data) => {
                // console.log('r10',data)
                //let room = data.find(roomName);
                // setRoom(rum)
                console.log(data.id)

                //setRoom(data.id)
                localStorage.setItem("room", data.id)
                //setRoom(result)
            });

      }, []) 
      

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
                    alert(`Room #${name} created!`);
                    
                } else {
                    alert("Error creating room!");
                }
            });
            break;
        case findTerm("/join #"):
            let roomToJoin = data.replace("/join #", "");
            const roomId = localStorage.getItem("room")
            console.log("keifjiej: ", roomId)

            if (roomId) {
                fetch("http://localhost:8080/data/room/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("user_id"),
                    room_id: room
                }),
            }).then(function (response) {
                if (response.ok) {
                    alert(`Joined room ${roomToJoin}!`);
                } else {
                    alert("Error joining room!");
                }
            });

            } else {
                alert("Room doesn't exist!")
            }

            

            

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
