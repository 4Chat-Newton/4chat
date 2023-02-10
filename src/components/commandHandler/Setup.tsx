export default function Setup(data:string) {
    //const data = jwt.verify(req.cookies.token, "secret_key");
    console.log("")
    if (data.startsWith("/create", 0)) {
        let name = data.replace("/create ", "")
        console.log("room to create:", name)
        console.log("Create room token: ", localStorage.getItem("token"))
        let token = localStorage.getItem("token")
        fetch('http://localhost:8080/data/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `${ token }`
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
    }
}