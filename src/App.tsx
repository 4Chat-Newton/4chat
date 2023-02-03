// import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

function App() {

  return (
    <div className='App'>
      <header >
        <h1>Hello World</h1>
        <div>
          <p>
        <Link to="/login">
          Login
        </Link>
        </p>
        <p>
        <Link to="/Register">
          Register
        </Link>
        </p>
        <p>
        <Link to="/Chatroom">
          Chatroom
        </Link>
        </p>
        <Link to="/Terms">
          Terms
        </Link>
        </div>
      </header>
    </div>
  );
}

export default App;
