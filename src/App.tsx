// import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

function App() {
  // let timeStamp = Date.now()

  // const [message, setMessage] = useState({
  //   user: "as",
  //   text: "",
  //   time: timeStamp,
  // });

    return (
        <div className='App' style={{display: "flex", flexDirection: "column", alignItems: "center", color: "wheat"}}>
            <header>
                <h1>Hello 4chat</h1>
            </header>
            <span> <br/> </span>
            <Link to={"/login"}> Login page</Link>
            <Link to={"/register"}> Register page</Link>
        </div>
    );
}

export default App;
