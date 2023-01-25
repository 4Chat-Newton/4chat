import React from "react";
import "./style.css";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function Login() {
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
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              ></a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-lime-400 placeholder-lime-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="email"
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
                />
              </div>
            </div>
            <div>
              <button className="bg-gray-700 px-7 py-2 text-blue-700 ml-40" type="submit">Login</button>
            </div>
            <div className="text-sm">
                <a
                  href="#"
                  className="px-7 py-2 text-blue-700 ml-40 bg-transparent text-decoration-line: underline"
                >
                  Register
                </a>
              </div>
          </form>
        </div>
      </div>
    </>
  );
}
