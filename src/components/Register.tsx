import { useState } from "react"

import './style.css'
export default function Register() {

  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleUserInput = (e: any) => {
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
    console.log("I got Clicked")
    if (password === confirmPassword) {

      await fetch('http://localhost:8080/data/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
          // .then(function (response) {
          //   console.log(response)
          //   if (response.ok == true) {
          //     fetch('data/register', {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'application/json',
          //         'Accept': 'application/json'
          //       },
          //       body: JSON.stringify({
          //         email: email,
          //         username: username,
          //         password: password,
          //       })
          //     }).then(function (response) {
          //       console.log(response)
          //
          //       // if(response.ok == true){
          //       //   // window.location.reload(true)
          //       // } else {
          //       //   console.log("fail")
          //       // }
          //     })
          //   }else {
          //     console.log("Log in failed")
          //   }
          // }) //.then(navigate("/"))

    }
    // else {
    //   alert("Password incorrect!")
    // }
  }

  return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>

              <img src="img/4chat.png"className="mx-auto h-20 w-auto" alt="logo" />

              <p className="mt-2 text-center text-sm text-gray-600">

                {/*<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"></a>*/}
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
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
                      // autoComplete="username"
                      // required
                      className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) =>  handleUserInput(e)}
                  />
                </div>

                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  {/*<input type="text" className="input-text" value={email} onChange={(e) =>  handleUserInput(e)} id="email" placeholder="Email" /> */}
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
                      className="mb-3 relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-300 placeholder-yellow-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) =>  handleUserInput(e)}
                  />
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                      id="confirmPassword"
                      name="password"
                      type="password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-400 placeholder-yellow-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Confirm password"
                      onChange={(e) =>  handleUserInput(e)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I have read and accept the
                    <br></br>
                    {/*<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 text-decoration-line: underline">*/}
                    {/*  Terms & Conditions*/}
                    {/*</a>*/}
                  </label>
                </div>
              </div>

              <div>
                {/* <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign Up
              </button> */}
                <button className="bg-gray-700 px-7 py-2 text-blue-700 mr-20" type="submit">Cancel</button>
                <button className="bg-gray-700 px-6 py-2 text-blue-700 ml-40" type="submit" onClick={() => handleSubmit()} >Submit</button>
                {/*<input className="signup-page-btn" type="submit" onClick={() => handleSubmit()} value="Sign up" />*/}
              </div>
            </form>
          </div>
        </div>
      </>
  )
}