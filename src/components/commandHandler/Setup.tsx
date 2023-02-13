export default function Setup(data:string) {
    if (data.startsWith("/create", 0)) {
        let name = data.replace("/create ", "")
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
    }
}