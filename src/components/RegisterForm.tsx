import React from "react";
import './style.css'
import { LockClosedIcon } from '@heroicons/react/20/solid'

export default function SignUp() {
  return (
    <>

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>

            <img src="img/4chat.png"className="mx-auto h-20 w-auto" alt="logo" />
            
{/*             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create a new account
            </h2> */}
            <p className="mt-2 text-center text-sm text-gray-600">
              
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="user-name" className="sr-only">
                  User Name
                </label>
                <input
                  id="user-name"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="User Name"
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
                />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-none px-3 py-2 text-yellow-400 placeholder-yellow-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I have read and accept the
                  <br></br>
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms & Conditions
                </a>
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
              <button className="bg-gray-700 px-7 py-2 text-blue-700 ml-40" type="submit">submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
