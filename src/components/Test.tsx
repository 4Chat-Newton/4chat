import {useState} from "react";

function Test() {
    // let jsonData = {
    //     "username": "normal_user",
    //     "email": "normal@4chat.com",
    //     "password": "pass1234"
    // }

    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserInput = (e: any) => {
        console.log(username)
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        }
        if (id === "username") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async () => {
        if (password === confirmPassword) {

            //TODO fetch should be '/data/register'
            await fetch('http://localhost:8080/data/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                    // username: jsonData.username,
                    // email: jsonData.email,
                    // password: jsonData.password
                })
            })
        }
    }

    return (<>
        {/*<button type="submit" onClick={() => handleSubmit()} >Submit</button>*/}
        <input
            id="username"
            name="username"
            type="username"
            placeholder="Username"
            // autoComplete="username"
            // required
            className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={(e) =>  handleUserInput(e)}
        />
        <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email"
            onChange={(e) =>  handleUserInput(e)}
        />
        <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mb-3 relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-300 placeholder-yellow-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            onChange={(e) =>  handleUserInput(e)}
        />
        <input
            id="confirmPassword"
            name="password"
            type="password"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-400 placeholder-yellow-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Confirm password"
            onChange={(e) =>  handleUserInput(e)}
        />
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