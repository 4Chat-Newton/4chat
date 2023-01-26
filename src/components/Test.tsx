function Test() {
    let jsonData = {
        "username": "normal_user",
        "email": "normal@4chat.com",
        "password": "pass1234"
    }
    const handleSubmit = async () => {
        console.log("I got Clicked")
        // console.log(jsonData)
        await fetch('http://localhost:8080/data/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            // mode: 'cors',
            body: JSON.stringify({
                username: jsonData.username,
                email: jsonData.email,
                password: jsonData.password
            })
        })
    }

    return (<>
        {/*<button type="submit" onClick={() => handleSubmit()} >Submit</button>*/}
        <button onClick={handleSubmit} style={{
            textAlign: 'center',
            width: '100px',
            border: '1px solid gray',
            borderRadius: '5px'
        }}>
            Send data to backend
        </button>
    </>)
}
export default Test