// import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { JwtProvider, useJwt } from "./jwt-context";

const App: React.FC = () => {
  return (
    <JwtProvider>
      <div
        className="app"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "wheat",
        }}
      >
        <header>
          <h1>Hello 4chat</h1>
        </header>
        <span>
          {" "}
          <br />{" "}
        </span>
        <Link to={"/login"}> Login page</Link>
        <Link to={"/register"}> Register page</Link>
        <Link to={"/Chatroom"}> Chatroom page</Link>
      </div>
    </JwtProvider>
  );
};

export default App;
