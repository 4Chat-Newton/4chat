import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../../App";
import Terms from "../../pages/Terms";
import ChatRoom from "../../pages/ChatRoom";
import Register from "../../pages/authentication/Register";
import Login from "../../pages/authentication/Login";

function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
