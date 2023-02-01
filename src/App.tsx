// import { useEffect, useState } from 'react';
import Kill from "./Kill";
function App() {

  return (
    <div className='App' style={ { display: "flex", flexDirection: "column", color: "wheat"}}>
      <header >
        <h1 style={{textAlign: "center"}} >Hello World</h1>
      </header>
        <div style={{
            display: "flex",
            justifyContent: "center",
            color: "wheat"
        }}>
        <button onClick={Kill}>Exit</button>

        </div>
    </div>
  );
}

export default App;
