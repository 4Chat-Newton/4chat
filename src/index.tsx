import React from "react";
import ReactDOM from "react-dom/client";
import ChatRouter from "./components/globalComponents/ChatRouter"
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./GlobalProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <GlobalProvider>
            < ChatRouter/>
            </GlobalProvider>
        </BrowserRouter>
    // </React.StrictMode>
);
