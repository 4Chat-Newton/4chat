import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";
import Terms from "../../pages/Terms";
import ChatRoom from "../../pages/ChatRoom";
import Settings from "../Settings";
function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
