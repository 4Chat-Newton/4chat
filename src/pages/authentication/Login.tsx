import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    

    const handleUserInput = (e: any) => {
        const {id, value} = e.target;
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }
    const signIn = async () => {
        //TODO fetch should be '/data/login'
        await fetch('http://localhost:8080/data/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then((response) => {
            if (response.status === 200){
                localStorage.setItem("isloggedIn", "true")
                return response.json()
            } else {
                alert("Couldn't log in!")
                return response.status
            }
        })
            .then(data => {
                localStorage.setItem("token", data.token)
            })
            .catch((err) => {
                console.log(err)
            })

        //TODO swap for a useState, needs some work
        if(localStorage.getItem("isloggedIn") === "true"){
            authenticateUser();
            navigate("/chatroom");
        }
    }

    const authenticateUser = async () => {

        await fetch('/data/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(function (response) {
            if (response.status === 200) {
                return response.json()
            } else {
                alert(`Error ${response.status}`)
            }
        }).then(data => {
            localStorage.setItem("user_id", data.id)
            localStorage.setItem("username", data.username)
            // localStorage.setItem("isLoggedIn", data.isLoggedIn)
        })
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            src="img/4chat.png"
                            alt="Logo"
                            className="mx-auto h-20 w-auto"
                        />
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="bg-gray-700 mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="email"
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-400 placeholder-yellow-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="password"
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <button id="login_btn" className="bg-gray-700 px-7 py-2 text-blue-700 ml-40" type="submit" onClick={signIn}>Login</button>
                    </div>
                    <div className="text-sm">
                        <Link to="/register"
                              className="px-7 py-2 text-blue-700 ml-40 bg-transparent text-decoration-line: underline">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}