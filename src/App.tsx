import { useState } from "react";

function App() {
  const [message, setMessage] = useState({
    user: "as",
    text: "",
    time: "12.12",
  });


  return (
    <div className="App">
      <h1>Hello World!!</h1>
    </div>
  );
}

export default App;
