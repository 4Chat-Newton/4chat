import { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../../GlobalContext";


const Setup = (data: string) => {
    //const count = useRef<string>(null)
    //const [room, setRoom] = useState("");
    //const { isLoggedIn } = useContext(GlobalContext) || { isLoggedIn: false}
    //const { room } = useContext(GlobalContext) || { findRoom: [] }

    const findTerm = (term: string) => {
        if (data.startsWith(term)) {
            return data;
        }
    };

    const joinRoom = async (roomToJoin: string) => {
        fetch("http://localhost:8080/data/room/" + roomToJoin) 
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert(`#${roomToJoin} doesn't exist!`)
                }  
            })
            .then((data) => {
                if (data) {
                    fetch("http://localhost:8080/data/room/join", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            room_id: data.id,
                            user_id: localStorage.getItem("user_id")
                        }),
                    }).then(function (response) {
                        if (response.ok) {
                            alert(`Joined room #${roomToJoin}!`);
                        } else {
                            alert(`You've already joined #${roomToJoin}!`);
                        }
                    });
                } else {
                    alert(`#${roomToJoin} doesn't exist!`)
                }

            });


    }


    switch (data) {
        case findTerm("/create #"):
            let name = data.replace("/create #", "");
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

            joinRoom(roomToJoin)
            break;
        case findTerm("/leave #"):





            break;
        default:
            break;
    }
}
export default Setup
