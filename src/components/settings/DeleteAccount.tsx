import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed

export default function DeleteAccount() {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserInput = (e: any) => {
        const { id, value } = e.target;
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async (e: any) => {
        const {id} = e.target;
        if (password === confirmPassword) {
            //TODO fetch should be '/data/register'
            await fetch('http://localhost:8080/data/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    password: password
                })
            })
                .then(function (response) {
                    // TODO remove when no longer needed after testing
                    console.log(response)
                    if (response.ok === true) {
                        //TODO add online status to body json
                        fetch('http://localhost:8080/data/login', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: id,
                                password: password,
                            })
                        }).then(function (response) {
                            console.log(response)
                            if (response.ok === true) {
                                alert("Your account is deleted.")
                            } else {
                                alert("Something went wrong, Please check your password.")
                            }

                        });//.then(navigate("/room"))
                    }
                });
        } else if (password !== confirmPassword) {
            alert("The passwords don't match!")
        }
    }


    return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                src="img/4chat.png"
                className="mx-auto h-20 w-auto"
                alt="logo"
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

          {/* Behöver en check som kollar att confirm inte länkar vidare om lösen inte stämmer */}
          <div>
            <Link
              to="/login"
              className="bg-gray-700 px-7 py-2 text-blue-700 mr-20"
              type="submit"
              id="confirm_btn"
            > Confirm
            </Link>
          </div>
        </div>
      </>
    );
}