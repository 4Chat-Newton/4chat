import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Terms from "./Terms";
import ChatRoom from "../pages/ChatRoom";

function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/ChatRoom" element={<ChatRoom/>}/>
      </Routes>
    </>
  );
}

export default ChatRouter;
