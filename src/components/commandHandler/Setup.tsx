
export default function Setup(data:string) {
    const findTerm = (term:string) => {
        if(data.startsWith(term)) {
            return data;
        }
    }
    switch (data) {
        case findTerm('/create #'):
            // /create #roomName 
            let name = data.replace("/create #", "")
            //name.split('#')
        fetch('http://localhost:8080/data/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify( {
                name: name
            })
        }).then(function (response) {
            if (response.ok) {
                alert(`Room ${name} created!`)
            } else {
                alert("Error creating room!")
            }
        });
        break;
        case findTerm('/join #'):
        //     let roomToJoin = data.replace("/join #", "")
        // fetch('http://localhost:8080/data/room/join', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': `Bearer ${localStorage.getItem("token")}`
        //     },
        //     body: JSON.stringify( {
        //         name: roomToJoin
        //     })
        // }).then(function (response) {
        //     if (response.ok) {
        //         alert(`Joined room ${roomToJoin}!`)
        //     } else {
        //         alert("Error joining room!")
        //     }
        // });
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