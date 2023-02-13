import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed
export default function Settings() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserInput = (e: any) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(function (response) {
                    // TODO remove when no longer needed after testing
                    console.log(response)
                    if (response.ok === true) {
                        //TODO add online status to body json
                        fetch('http://localhost:8080/data/login', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                            })
                        }).then(function (response) {
                            console.log(response)
                            if (response.ok === true) {
                                alert("E-mail changed successfully")
                            } else {
                                alert("Could not change e-mail")
                            }

                        });//.then(navigate("/room"))
                    }
                });
        } else if (password !== confirmPassword) {
            alert("The passwords don't match!")
        } else {
            alert("You need to type in your new e-mail and password") // Ska man kunna byta e-mail?
        }
    }


    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img src="img/4chat.png" className="mx-auto h-20 w-auto" alt="logo" />
                    </div>


                    <div className="-space-y-px rounded-md shadow-sm">

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

                    <div>
                        <Link to="/login" className="bg-gray-700 px-7 py-2 text-blue-700 mr-40 pl-10" type="submit"
                            id="update_btn">Update
                        </Link>
                        <Link to="/delete-account" className="bg-gray-700 px-7 py-2 text-blue-700 ml-" type="submit"
                            id="delete_btn">Delete Account
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}
