import {useState} from "react"
import {Navigate, Link} from "react-router-dom";

import './style.css'

function Register() {

    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleUserInput = (e: any) => {
        const {id, value} = e.target;
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
        if (password === confirmPassword && acceptTerms === true) {
            //TODO fetch should be '/data/register'
            await fetch('http://localhost:8080/data/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
                .then(function (response) {
                    // TODO remove when no longer needed after testing
                    console.log(response)
                    if (response.ok == true) {

                        fetch('http://localhost:8080/data/login', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                email: email,
                                password: password,
                            })
                        }).then(function (response) {
                            console.log(response)
                                if (response.ok == true) {
                                    alert("User successfully registered!")
                                } else {
                                    alert("The username or email is already in use!")
                                }

                        });//.then(navigate("/room"))
                    }
                });
        } else if (password != confirmPassword) {
            alert("The passwords don't match!")
        } else {
            alert("To register an account, you need to accept the Terms & Conditions!")
        }
    }


    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img src="img/4chat.png" className="mx-auto h-20 w-auto" alt="logo"/>
                    </div>


                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                User Name
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                placeholder="Username"
                                autoComplete="username"
                                onChange={(e) => handleUserInput(e)}
                                className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                onChange={(e) => handleUserInput(e)}
                                className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                onChange={(e) => handleUserInput(e)}
                                className="mb-3 relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-300 placeholder-yellow-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <input
                                id="confirmPassword"
                                name="password"
                                type="password"
                                placeholder="Confirm password"
                                onChange={(e) => handleUserInput(e)}
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-400 placeholder-yellow-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                defaultChecked={acceptTerms}
                                onChange={() => setAcceptTerms(!acceptTerms)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I have read and accept the
                                <br></br>

                                <a href="/terms"
                                   className="font-medium text-indigo-600 hover:text-indigo-500 text-decoration-line: underline">
                                    Terms & Conditions
                                </a>

                            </label>
                        </div>
                    </div>

                    <div>
                        <Link to="/login" className="bg-gray-700 px-7 py-2 text-blue-700 mr-20" type="submit"
                              id="cancel_btn">Cancel
                        </Link>
                        <button className="bg-gray-700 px-6 py-2 text-blue-700 ml-40" type="submit"
                                name="submit_btn" id="submit_btn" onClick={handleSubmit}>Submit
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register