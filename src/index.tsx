import React from "react";
import ReactDOM from "react-dom/client";
import ChatRouter from "./components/ChatRouter"
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Router>
    < ChatRouter/>
  </Router>
  // </React.StrictMode>
);
