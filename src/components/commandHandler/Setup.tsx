

const Setup = async (data:string) => {
    //const data = jwt.verify(req.cookies.token, "secret_key");

    if (data.startsWith("/create", 0)) {
        let name = data.replace("/create ", "")
        console.log("room to create:", name)

        await fetch('http://localhost:8080/data/room', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                name: name
            })
        }).then(function (response) {
            if (response.ok === true) {
                alert(`Room ${name} created!`)
            } else {
                alert("Error creating room!")
            }

        });
    }
}

export default Setup