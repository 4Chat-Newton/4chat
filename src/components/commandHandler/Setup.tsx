const Setup = (data: string) => {

    const findTerm = (term: string) => {
        if (data.startsWith(term)) {
            return data;
        }
    };

    const joinRoom = async (roomToJoin: string) => {
        fetch("/data/room/" + roomToJoin)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert(`#${roomToJoin} doesn't exist!`)
                }  
            })
            .then((data) => {
                if (data) {
                    fetch("/data/room/join", {
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
            fetch("/data/room", {
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
